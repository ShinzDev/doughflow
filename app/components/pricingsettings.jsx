export default function PricingSettings({ 
  costBig, setCostBig, 
  costSmall, setCostSmall, 
  priceBig, setPriceBig, 
  priceSmall, setPriceSmall 
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl mb-8">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">⚙️ Price Configuration (Per Loaf)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Big Bread Settings */}
        <div className="p-4 bg-gray-700/50 rounded-lg border border-blue-900/30">
          <h4 className="font-bold text-blue-400 mb-3 text-lg">Big Bread 🍞</h4>
          <div className="grid grid-cols-2 gap-4">
            <PriceInput label="Cost (Pay Bakery)" value={costBig} onChange={setCostBig} color="blue" />
            <PriceInput label="Price (Charge Hospital)" value={priceBig} onChange={setPriceBig} color="blue" />
          </div>
        </div>

        {/* Small Bread Settings */}
        <div className="p-4 bg-gray-700/50 rounded-lg border border-amber-900/30">
          <h4 className="font-bold text-amber-400 mb-3 text-lg">Small Bread 🥖</h4>
          <div className="grid grid-cols-2 gap-4">
            <PriceInput label="Cost (Pay Bakery)" value={costSmall} onChange={setCostSmall} color="amber" />
            <PriceInput label="Price (Charge Hospital)" value={priceSmall} onChange={setPriceSmall} color="amber" />
          </div>
        </div>
      </div>
    </div>
  );
}

// A tiny sub-component to avoid repeating input code
function PriceInput({ label, value, onChange, color }) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-2 text-gray-500">₦</span>
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full pl-8 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-${color}-500 outline-none`}
        />
      </div>
    </div>
  );
}