import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Fix Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom clinic icon (Lavender themed)
const clinicIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const PUNE_CENTER = [18.5204, 73.8567];

// Component to update map view dynamically
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapView({ onSelectClinic, selectedClinic }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [center, setCenter] = useState(PUNE_CENTER);
  const [isLocating, setIsLocating] = useState(false);

  // 1. Fetch Clinics from Overpass API
  const fetchClinics = useCallback(async (lat, lng) => {
    setLoading(true);
    try {
      const radius = 5000; // 5km
      const query = `[out:json];node["amenity"="veterinary"](around:${radius},${lat},${lng});out;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      const response = await axios.get(url);
      const data = response.data.elements.map(el => ({
        id: el.id,
        name: el.tags.name || 'Unnamed Clinic',
        lat: el.lat,
        lng: el.lon,
        address: el.tags['addr:street'] || 'Address not available',
        openingHours: el.tags.opening_hours || 'Not specified',
        phone: el.tags.phone || el.tags['contact:phone'] || 'N/A'
      }));

      setClinics(data);
      if (data.length === 0) {
        toast('No clinics found in this area.', { icon: 'ℹ️' });
      }
    } catch (error) {
      console.error('Error fetching clinics:', error);
      toast.error('Failed to fetch clinics. Try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchClinics(PUNE_CENTER[0], PUNE_CENTER[1]);
  }, [fetchClinics]);

  // 2. Search City using Nominatim
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newCenter = [parseFloat(lat), parseFloat(lon)];
        setCenter(newCenter);
        fetchClinics(newCenter[0], newCenter[1]);
      } else {
        toast.error('Location not found.');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search location.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Geolocation
  const locateUser = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = [latitude, longitude];
        setCenter(newCenter);
        fetchClinics(latitude, longitude);
        setIsLocating(false);
        toast.success('Location updated!');
      },
      () => {
        toast.error('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  };

  const handleSelect = (clinic) => {
    if (onSelectClinic) {
      onSelectClinic(clinic);
      toast.success(`Selected: ${clinic.name}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city (e.g. Pune, Mumbai)..."
            className="input-field pr-12"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--color-primary)] hover:scale-110 transition-transform"
          >
            🔍
          </button>
        </form>
        <button
          type="button"
          onClick={locateUser}
          disabled={isLocating}
          className="btn-outline flex items-center justify-center gap-2 whitespace-nowrap !py-3 !px-5"
        >
          {isLocating ? '📡 Locating...' : '📍 Use My Location'}
        </button>
      </div>

      <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        {loading && (
          <div className="absolute inset-0 z-[2000] bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Fetching Clinics...</p>
            </div>
          </div>
        )}

        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={center} />

          {clinics.map((clinic) => (
            <Marker
              key={clinic.id}
              position={[clinic.lat, clinic.lng]}
              icon={clinicIcon}
            >
              <Popup className="clinic-popup">
                <div className="p-1 min-w-[180px]">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">🏥 {clinic.name}</h3>
                  <p className="text-[11px] text-gray-600 mb-2">📍 {clinic.address}</p>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span>🕒</span> {clinic.openingHours}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span>📞</span> {clinic.phone}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(clinic)}
                    className="w-full bg-[var(--color-primary)] text-white text-[11px] py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 shadow-md shadow-purple-200"
                  >
                    Select for Booking
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Clinic Display */}
      <AnimatePresence>
        {selectedClinic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-xl border-2 border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 flex items-center gap-4 shadow-lg shadow-purple-100/50"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-xl text-white shadow-md">
              🏥
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-black">{selectedClinic.name}</p>
              <p className="text-[11px] text-gray-600 font-medium">📍 {selectedClinic.address || 'Location selected on map'}</p>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              Selected
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

