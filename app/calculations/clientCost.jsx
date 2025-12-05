'use client'

import { useState } from "react";

export default function Clientcost() {
  
  // 1. DEFINE COSTS (You can change these later)
  const bakeryCostSmall = 200;
  const bakeryCostBig = 240;
  
  // 2. STATE (Holds the numbers you type)
  const [smallBreadQty, setSmallBreadQty] = useState();
  const [bigBreadQty, setBigBreadQty] = useState();

  // 3. THE MATH (Calculated automatically every time state changes)
  const totalCostBig = bigBreadQty * bakeryCostBig;
  const totalCostSmall = smallBreadQty * bakeryCostSmall;
  const totalPayable = totalCostBig + totalCostSmall;

  return (
    
    <div className="p-10 flex flex-col gap-8 bg-amber-50 min-h-screen items-center">
        
        {/* INPUT SECTION */}
        <div className="flex gap-4">
            {/* Big Bread Input */}
            <div className="border p-4 bg-white rounded shadow">
                <label className="block font-bold mb-2">Big Bread Qty</label>
                <input 
                    type="number"  
                    placeholder="0"
                    className="border border-gray-300 p-2 rounded h-10 w-32"
                    value={bigBreadQty}
                    onChange={(e) => setBigBreadQty(Number(e.target.value))}
                />
            </div>

            {/* Small Bread Input */}
            <div className="border p-4 bg-white rounded shadow">
                <label className="block font-bold mb-2">Small Bread Qty</label>
                <input 
                    type="number"  
                    placeholder="0"
                    className="border border-gray-300 p-2 rounded h-10 w-32"
                    value={smallBreadQty}
                    onChange={(e) => setSmallBreadQty(Number(e.target.value))}
                />
            </div>
        </div>

        {/* RESULTS SECTION (Display the Math) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Calculation</h2>
            
            <div className="flex justify-between mb-2">
                <span>Big Bread Cost:</span>
                <span className="font-mono">{bigBreadQty} x {bakeryCostBig} = <strong>₦{totalCostBig}</strong></span>
            </div>
            
            <div className="flex justify-between mb-4">
                <span>Small Bread Cost:</span>
                <span className="font-mono">{smallBreadQty} x {bakeryCostSmall} = <strong>₦{totalCostSmall}</strong></span>
            </div>
            
            <div className="border-t pt-4 flex justify-between text-xl font-bold text-red-600">
                <span>Total to Pay Bakery:</span>
                <span>₦{totalPayable}</span>
            </div>
        </div>

    </div>
  );
}