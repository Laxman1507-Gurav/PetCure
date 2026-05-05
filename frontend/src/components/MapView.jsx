import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const clinicIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const PUNE_CENTER = [18.5204, 73.8567];

const DEMO_CLINICS = [
  { id: 1, name: 'Pune Pet Hospital', lat: 18.5204, lng: 73.8567, phone: '+91 20 1234 5678', rating: 4.8 },
  { id: 2, name: 'Deccan Vet Clinic', lat: 18.516, lng: 73.84, phone: '+91 20 2345 6789', rating: 4.6 },
  { id: 3, name: 'Kothrud Animal Care', lat: 18.507, lng: 73.807, phone: '+91 20 3456 7890', rating: 4.7 },
  { id: 4, name: 'Hadapsar Pet Center', lat: 18.508, lng: 73.925, phone: '+91 20 4567 8901', rating: 4.5 },
  { id: 5, name: 'Baner Veterinary Clinic', lat: 18.559, lng: 73.779, phone: '+91 20 5678 9012', rating: 4.9 },
];

export default function MapView({ onSelectClinic, selectedClinic }) {
  const [map, setMap] = useState(null);

  const handleSelect = (clinic) => {
    if (onSelectClinic) {
      onSelectClinic(clinic);
      toast.success(`Selected: ${clinic.name}`);
    }
  };

  const locateUser = () => {
    if (!map) return;
    map.locate().on('locationfound', (e) => {
      map.flyTo(e.latlng, 14);
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative h-[350px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
        <MapContainer
          center={PUNE_CENTER}
          zoom={12}
          className="h-full w-full"
          whenCreated={setMap}
        >
          <TileLayer 
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />

          {/* Clinics */}
          {DEMO_CLINICS.map((clinic) => (
            <Marker
              key={clinic.id}
              position={[clinic.lat, clinic.lng]}
              icon={clinicIcon}
              eventHandlers={{
                click: () => handleSelect(clinic)
              }}
            >
              <Popup>
                <div className="p-1 min-w-[150px]">
                  <div className="text-sm font-bold text-gray-900">{clinic.name}</div>
                  <div className="text-xs text-gray-600 mt-1">⭐ {clinic.rating} · {clinic.phone}</div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(clinic);
                    }}
                    className="mt-3 w-full bg-[var(--color-primary)] text-white text-xs py-2 rounded-lg font-semibold hover:opacity-90 transition-all active:scale-95"
                  >
                    Confirm Selection
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Locate Button */}
        <button
          type="button"
          onClick={locateUser}
          className="absolute bottom-4 right-4 z-[1000] bg-white p-2.5 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="My Location"
        >
          📍
        </button>
      </div>

      {selectedClinic && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !rounded-xl p-4 flex items-center gap-4 border-[var(--color-primary)]/30 shadow-md bg-[var(--color-primary)]/5"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl shadow-inner">
            🏥
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-black">{selectedClinic.name}</p>
            <p className="text-xs text-gray-600 font-medium">⭐ {selectedClinic.rating} · {selectedClinic.phone}</p>
          </div>
          <div className="px-3 py-1 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
            Selected
          </div>
        </motion.div>
      )}
    </div>
  );
}
