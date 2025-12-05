'use client'

import { useState } from "react";

export default function Calculator() {
  
  // --- 1. SETTINGS STATE (The Prices) ---
  // Defaulting to your specific costs: 240 and 180
  const [costBig, setCostBig] = useState(240);     // Cost from Bakery
  const [costSmall, setCostSmall] = useState(180); // Cost from Bakery
  
  const [priceBig, setPriceBig] = useState(300);   // Price to Hospital (Example)
  const [priceSmall, setPriceSmall] = useState(250); // Price to Hospital (Example)

  // --- 2. ORDER STATE (The Quantities) ---
  const [qtyBig, setQtyBig] = useState(0);
  const [qtySmall, setQtySmall] = useState(0);

  // --- 3. THE MATH (Calculates automatically) ---
  
  // A. What you OWE the Bakery
  const totalCost = (qtyBig * costBig) + (qtySmall * costSmall);

  // B. What the Hospital OWES you (Revenue)
  const totalRevenue = (qtyBig * priceBig) + (qtySmall * priceSmall);

  // C. Your Profit
  const profit = totalRevenue - totalCost;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-6">
        
        {/* SECTION A: PRICING CONFIGURATION (Editable Prices) */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">⚙️ Pricing Settings (Per Loaf)</h3>
            
            <div className="grid grid-cols-2 gap-6">
                {/* Big Bread Settings */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-2">Big Bread 🍞</h4>
                    <div className="space-y-2">
                        <div>
                            <label className="text-xs text-gray-500">Cost (Pay Bakery)</label>
                            <input 
                                type="number" 
                                value={costBig}
                                onChange={(e) => setCostBig(Number(e.target.value))}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Price (Charge Hospital)</label>
                            <input 
                                type="number" 
                                value={priceBig}
                                onChange={(e) => setPriceBig(Number(e.target.value))}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Small Bread Settings */}
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <h4 className="font-bold text-amber-800 mb-2">Small Bread 🥖</h4>
                    <div className="space-y-2">
                        <div>
                            <label className="text-xs text-gray-500">Cost (Pay Bakery)</label>
                            <input 
                                type="number" 
                                value={costSmall}
                                onChange={(e) => setCostSmall(Number(e.target.value))}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Price (Charge Hospital)</label>
                            <input 
                                type="number" 
                                value={priceSmall}
                                onChange={(e) => setPriceSmall(Number(e.target.value))}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION B: DAILY ENTRY (How many did you deliver?) */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Daily Delivery Entry</h2>
            
            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-600 mb-1">Big Loaves</label>
                    <input 
                        type="number" 
                        value={qtyBig}
                        onChange={(e) => setQtyBig(Number(e.target.value))}
                        className="w-full text-3xl font-bold text-center p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 outline-none"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-600 mb-1">Small Loaves</label>
                    <input 
                        type="number" 
                        value={qtySmall}
                        onChange={(e) => setQtySmall(Number(e.target.value))}
                        className="w-full text-3xl font-bold text-center p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 outline-none"
                    />
                </div>
            </div>

            {/* SECTION C: REAL-TIME RESULTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
                
                {/* 1. Pay Bakery */}
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-xs text-red-600 uppercase font-bold">Pay Bakery</div>
                    <div className="text-2xl font-bold text-red-700">₦{totalCost.toLocaleString()}</div>
                </div>

                {/* 2. Hospital Bill */}
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-xs text-blue-600 uppercase font-bold">Invoice Value</div>
                    <div className="text-2xl font-bold text-blue-700">₦{totalRevenue.toLocaleString()}</div>
                </div>

                {/* 3. Your Profit */}
                <div className="text-center p-4 bg-green-100 rounded-lg border border-green-200 shadow-sm transform scale-105">
                    <div className="text-xs text-green-700 uppercase font-bold">Net Profit</div>
                    <div className="text-3xl font-extrabold text-green-800">₦{profit.toLocaleString()}</div>
                </div>

            </div>
        </div>

    </div>
  );
}