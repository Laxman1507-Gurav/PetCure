import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_MEDICINES = [
  { 
    id: 1, 
    name: 'Canine Dewormer', 
    category: 'Dog', 
    desc: 'Broad-spectrum deworming tablet for dogs.', 
    price: '₹180', 
    icon: '💊', 
    tag: 'Bestseller',
    usage: 'One tablet per 10kg body weight. Administer on an empty stomach.',
    care: 'Keep away from children. Consult a vet if your dog is pregnant.',
    symptoms: 'Loss of appetite, weight loss, visible worms in stool.',
    remedies: 'Ensure clean drinking water and maintain hygiene in the pet area.'
  },
  { 
    id: 2, 
    name: 'Feline Vitamins', 
    category: 'Cat', 
    desc: 'Daily multivitamin supplement for cats.', 
    price: '₹250', 
    icon: '🐱', 
    tag: 'Popular',
    usage: 'Mix 1-2 drops in daily wet food or water.',
    care: 'Store in a cool, dry place. Do not exceed recommended dosage.',
    symptoms: 'Dull coat, low energy levels, poor immunity.',
    remedies: 'Combine with a high-protein diet for best results.'
  },
  { 
    id: 3, 
    name: 'Anti-Tick Spray', 
    category: 'Dog', 
    desc: 'Fast-acting tick & flea repellent spray.', 
    price: '₹320', 
    icon: '🌿', 
    tag: 'New',
    usage: 'Spray evenly over the coat, avoiding eyes and mouth. Rub in gently.',
    care: 'Flammable. Do not use on broken skin or near open flames.',
    symptoms: 'Excessive scratching, visible ticks or fleas, red spots on skin.',
    remedies: 'Bathe pet with medicated shampoo before application.'
  },
  { 
    id: 4, 
    name: 'Bird Calcium Drops', 
    category: 'Bird', 
    desc: 'Essential calcium supplement for birds.', 
    price: '₹140', 
    icon: '🦜', 
    tag: null,
    usage: 'Add 3-5 drops to 100ml of drinking water daily.',
    care: 'Change water every 24 hours. Keep bottle tightly closed.',
    symptoms: 'Weak eggshells, feather plucking, lethargy.',
    remedies: 'Provide access to natural sunlight and cuttlefish bone.'
  },
  { 
    id: 5, 
    name: 'Rabbit Digestive Aid', 
    category: 'Rabbit', 
    desc: 'Probiotic formula for healthy rabbit gut.', 
    price: '₹210', 
    icon: '🐰', 
    tag: null,
    usage: 'Sprinkle half a scoop over fresh hay or pellets twice daily.',
    care: 'Check expiration date. Ensure hay is always fresh.',
    symptoms: 'Bloating, irregular stool, reduced appetite.',
    remedies: 'Encourage movement and provide plenty of fresh timothy hay.'
  },
  { 
    id: 6, 
    name: 'Dog Joint Supplement', 
    category: 'Dog', 
    desc: 'Glucosamine chondroitin for joint health.', 
    price: '₹450', 
    icon: '🦴', 
    tag: 'Premium',
    usage: 'One chewable tablet daily with meals.',
    care: 'For older dogs. Monitor for any allergic reactions.',
    symptoms: 'Limping, difficulty climbing stairs, stiffness after rest.',
    remedies: 'Gentle exercise and keeping the pet at a healthy weight.'
  },
  { 
    id: 7, 
    name: 'Cat Hairball Control', 
    category: 'Cat', 
    desc: 'Reduces hairball formation and improves digestion.', 
    price: '₹190', 
    icon: '🧶', 
    tag: null,
    usage: '1 inch of gel once daily for 3 days, then twice weekly.',
    care: 'Apply on paw or nose for the cat to lick. Store at room temperature.',
    symptoms: 'Gagging, dry cough, vomiting hair clumps.',
    remedies: 'Regular grooming and increasing fiber in the diet.'
  },
  { 
    id: 8, 
    name: 'Fish Tank Conditioner', 
    category: 'Fish', 
    desc: 'Makes tap water safe for freshwater fish instantly.', 
    price: '₹120', 
    icon: '🐟', 
    tag: null,
    usage: '5ml per 50 liters of new tap water.',
    care: 'Do not overdose. Keep away from direct sunlight.',
    symptoms: 'Fish gasping at surface, cloudy water, stress marks.',
    remedies: 'Regular water changes and maintaining filter health.'
  },
  { 
    id: 9, 
    name: 'Reptile Vitamin D3', 
    category: 'Reptile', 
    desc: 'Essential vitamin for bone health in captive reptiles.', 
    price: '₹280', 
    icon: '🦎', 
    tag: 'New',
    usage: 'Dust lightly on feeder insects or greens 2-3 times weekly.',
    care: 'Highly concentrated. Use as directed by a specialist.',
    symptoms: 'Soft shells (in turtles), tremors, bowed legs.',
    remedies: 'Ensure proper UVB lighting in the enclosure.'
  },
  { 
    id: 10, 
    name: 'Pet Probiotic Paste', 
    category: 'General', 
    desc: 'Restores gut balance for all small animals.', 
    price: '₹230', 
    icon: '🌱', 
    tag: null,
    usage: 'Administer directly into the mouth or mix with food.',
    care: 'Refrigerate after opening. Use within 3 months.',
    symptoms: 'Diarrhea, indigestion, post-antibiotic recovery.',
    remedies: 'Provide plenty of water and avoid processed treats.'
  },
  { 
    id: 11, 
    name: 'Wound Care Spray', 
    category: 'General', 
    desc: 'Antiseptic and healing spray for minor cuts.', 
    price: '₹175', 
    icon: '🩹', 
    tag: 'Bestseller',
    usage: 'Clean the wound area and spray from 4 inches distance twice daily.',
    care: 'Avoid contact with eyes. For external use only.',
    symptoms: 'Abrasions, minor cuts, skin irritation.',
    remedies: 'Prevent the pet from licking the wound with a cone if necessary.'
  },
  { 
    id: 12, 
    name: 'Calming Chews', 
    category: 'Dog', 
    desc: 'Natural calming support for anxiety and stress.', 
    price: '₹350', 
    icon: '🧘', 
    tag: 'Popular',
    usage: 'Give one chew 30 minutes before stressful events.',
    care: 'Not for use as a sedative. Consult vet for long-term anxiety.',
    symptoms: 'Barking at thunder, separation anxiety, destructive chewing.',
    remedies: 'Create a safe "den" area for the pet during storms.'
  },
  { 
    id: 13, 
    name: 'Cattle Calcium Gel', 
    category: 'Cattle', 
    desc: 'High-potency calcium supplement for dairy cows.', 
    price: '₹220', 
    icon: '🐄', 
    tag: 'Bestseller',
    usage: 'Administer one full bottle orally after calving or as directed.',
    care: 'For veterinary use only. Not for human consumption.',
    symptoms: 'Milk fever, low milk production, weak bones.',
    remedies: 'Ensure a balanced diet with proper mineral mixtures.'
  },
  { 
    id: 14, 
    name: 'Deworming Bolus', 
    category: 'Cattle', 
    desc: 'Broad-spectrum dewormer for buffalo and cattle.', 
    price: '₹140', 
    icon: '💊', 
    tag: 'Popular',
    usage: 'One bolus orally for an adult animal. Repeat after 3 months.',
    care: 'Check withdrawal period for milk and meat. Store in a dry place.',
    symptoms: 'Poor growth, rough coat, reduced appetite, diarrhea.',
    remedies: 'Maintain clean grazing areas and provide fresh water.'
  },
  { 
    id: 15, 
    name: 'Mastitis Ointment', 
    category: 'Cattle', 
    desc: 'External ointment for udder care and protection.', 
    price: '₹195', 
    icon: '🧴', 
    tag: 'New',
    usage: 'Apply gently on the udder after every milking session.',
    care: 'Wash hands before and after application. Clean udder thoroughly.',
    symptoms: 'Udder swelling, hardness, blood or clumps in milk.',
    remedies: 'Ensure dry bedding and maintain high milking hygiene.'
  },
  { 
    id: 16, 
    name: 'Ruminant Digestant', 
    category: 'Cattle', 
    desc: 'Powder to improve digestion and rumen health.', 
    price: '₹110', 
    icon: '🌾', 
    tag: null,
    usage: 'Mix 50g in feed or water twice daily.',
    care: 'Avoid overfeeding green fodder. Consult a vet for acute bloat.',
    symptoms: 'Bloating, reduced cud-chewing, indigestion.',
    remedies: 'Feed quality dry roughage and avoid sudden diet changes.'
  },
];

const CATEGORIES = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Cattle', 'General'];

const TAG_COLORS = {
  Bestseller: 'badge-green',
  Popular: 'badge-blue',
  New: 'badge-amber',
  Premium: 'badge-red',
};

export default function Medicines() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);

  const filtered = ALL_MEDICINES.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  const addToCart = (id) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-24 section-wrapper">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="badge badge-blue mb-4">Pharmacy</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-black">Pet Medicines 💊</h1>
            <p className="text-gray-800 mt-2">Vet-approved medicines with full care instructions.</p>
          </div>
          {cart.length > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="glass-card !rounded-xl px-5 py-3 flex items-center gap-4 border-[var(--color-primary)]/30"
            >
              <span className="text-[var(--color-primary)] font-bold">🛒 {cart.length} item{cart.length > 1 ? 's' : ''}</span>
              <button
                onClick={() => setCart([])}
                className="btn-primary !py-1.5 !px-4 !text-xs !shadow-none"
              >
                Checkout
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search medicines..."
          className="input-field sm:max-w-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-800">No medicines found for "{search}"</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((med) => {
            const inCart = cart.includes(med.id);
            return (
              <motion.div
                key={med.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="glass-card p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{med.icon}</span>
                  {med.tag && <span className={`badge ${TAG_COLORS[med.tag]}`}>{med.tag}</span>}
                </div>

                <h3 className="text-base font-bold text-black mb-1">{med.name}</h3>
                <p className="text-xs text-gray-800 leading-relaxed flex-1 mb-3">{med.desc}</p>
                <div className="flex gap-2 items-center mb-4">
                   <span className="text-[10px] font-bold py-0.5 px-2 bg-gray-100 rounded text-gray-600 uppercase">{med.category}</span>
                   <button 
                     onClick={() => setSelectedMed(med)}
                     className="text-[10px] font-bold text-[var(--color-primary)] hover:underline"
                   >
                     View Guide 📖
                   </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-[var(--color-primary)]">{med.price}</span>
                  <button
                    onClick={() => addToCart(med.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      inCart
                        ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)]'
                        : 'bg-white border-gray-200 text-black'
                    }`}
                  >
                    {inCart ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Medicine Info Modal */}
      <AnimatePresence>
        {selectedMed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMed(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#F0F8FF] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                <div className="flex justify-between items-start mb-6 sticky top-0 bg-[#F0F8FF] z-10 py-1">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedMed.icon}</span>
                    <div>
                      <h2 className="text-2xl font-extrabold text-black">{selectedMed.name}</h2>
                      <span className="badge badge-blue !text-[10px]">{selectedMed.category} Care</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMed(null)}
                    className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-xl shadow-sm hover:bg-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🩺</span> Symptoms & Usage
                    </h4>
                    <div className="text-sm text-gray-800 leading-relaxed bg-white/50 p-3 rounded-xl border border-blue-100">
                      <strong>Symptoms:</strong> {selectedMed.symptoms}<br/>
                      <strong className="block mt-2">Dose:</strong> {selectedMed.usage}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>⚠️</span> Care & Precautions
                    </h4>
                    <div className="text-sm text-gray-800 leading-relaxed bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                      {selectedMed.care}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>✨</span> Natural Remedies & Tips
                    </h4>
                    <div className="text-sm text-gray-800 leading-relaxed bg-green-50/50 p-3 rounded-xl border border-green-100">
                      {selectedMed.remedies}
                    </div>
                  </section>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between sticky bottom-0 bg-[#F0F8FF] z-10">
                   <span className="text-2xl font-extrabold text-black">{selectedMed.price}</span>
                   <button 
                     onClick={() => { addToCart(selectedMed.id); setSelectedMed(null); }}
                     className="btn-primary"
                   >
                     Add to Cart 🛒
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
