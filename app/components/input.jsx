'use client'

import { useState, useEffect } from 'react';

export default function OrderPage() {

  // --- 1. PRICING SETTINGS STATE (Editable) ---
  // Default values set to your specific costs: 240 and 180
  const [costBig, setCostBig] = useState(240);     // Pay Bakery
  const [costSmall, setCostSmall] = useState(180); // Pay Bakery
  
  // Selling prices (You can change these defaults)
  const [priceBig, setPriceBig] = useState(300);   // Charge Hospital
  const [priceSmall, setPriceSmall] = useState(250); // Charge Hospital

  // --- 2. ORDER GRID STATE (The Rows) ---
  const [rows, setRows] = useState([
    { id: 1, date: new Date().toISOString().split('T')[0], big: 0, small: 0 }
  ]);

  // --- 3. TOTALS STATE ---
  const [totals, setTotals] = useState({
    totalBig: 0,
    totalSmall: 0,
    payBakery: 0,
    chargeClient: 0,
    profit: 0
  });

  // --- 4. HELPER FUNCTIONS ---
  
  const addRow = () => {
    const newRow = {
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0],
      big: 0,
      small: 0
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        const val = field === 'date' ? value : Number(value);
        return { ...row, [field]: val };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // --- 5. THE CALCULATION LOGIC ---
  // Runs automatically whenever you change prices OR grid numbers
  useEffect(() => {
    // A. Sum up the quantities from all rows
    const totalBig = rows.reduce((acc, row) => acc + (row.big || 0), 0);
    const totalSmall = rows.reduce((acc, row) => acc + (row.small || 0), 0);

    // B. Calculate Financials using the STATE variables
    // Bakery Cost
    const payBakery = (totalBig * costBig) + (totalSmall * costSmall);

    // Client Charge (Revenue)
    const chargeClient = (totalBig * priceBig) + (totalSmall * priceSmall);

    // Profit
    const profit = chargeClient - payBakery;

    setTotals({
      totalBig,
      totalSmall,
      payBakery,
      chargeClient,
      profit
    });
  }, [rows, costBig, costSmall, priceBig, priceSmall]); 


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-mono">
      <h1 className="text-3xl mb-6 font-bold text-gray-100 border-b border-gray-700 pb-4">
        Bread Supply Manager
      </h1>

      {/* --- TOP SECTION: SETTINGS (Where you set the 240/180) --- */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">⚙️ Price Configuration (Per Loaf)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Big Bread Settings */}
            <div className="p-4 bg-gray-700/50 rounded-lg border border-blue-900/30">
                <h4 className="font-bold text-blue-400 mb-3 text-lg">Big Bread 🍞</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Cost (Pay Bakery)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₦</span>
                            <input 
                                type="number" 
                                value={costBig}
                                onChange={(e) => setCostBig(Number(e.target.value))}
                                className="w-full pl-8 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Price (Charge Hospital)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₦</span>
                            <input 
                                type="number" 
                                value={priceBig}
                                onChange={(e) => setPriceBig(Number(e.target.value))}
                                className="w-full pl-8 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Small Bread Settings */}
            <div className="p-4 bg-gray-700/50 rounded-lg border border-amber-900/30">
                <h4 className="font-bold text-amber-400 mb-3 text-lg">Small Bread 🥖</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Cost (Pay Bakery)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₦</span>
                            <input 
                                type="number" 
                                value={costSmall}
                                onChange={(e) => setCostSmall(Number(e.target.value))}
                                className="w-full pl-8 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Price (Charge Hospital)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₦</span>
                            <input 
                                type="number" 
                                value={priceSmall}
                                onChange={(e) => setPriceSmall(Number(e.target.value))}
                                className="w-full pl-8 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* --- LEFT SECTION: THE INPUT GRID --- */}
        <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-400 border-b border-gray-600 pb-2">
            <div className="text-center font-bold text-blue-400">Qty Big Bread</div>
            <div className="text-center font-bold text-amber-400">Qty Small Bread</div>
            <div className="text-center">Date</div>
          </div>

          {/* Render the Rows */}
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-3 gap-4 items-center">
                <input
                  type="number"
                  placeholder="0"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-xl text-white focus:outline-none focus:border-blue-500"
                  value={row.big || ''} 
                  onChange={(e) => handleInputChange(row.id, 'big', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="0"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-xl text-white focus:outline-none focus:border-amber-500"
                  value={row.small || ''}
                  onChange={(e) => handleInputChange(row.id, 'small', e.target.value)}
                />
                <input
                  type="date"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-sm text-white focus:outline-none focus:border-gray-500"
                  value={row.date}
                  onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Buttons & Totals */}
          <div className="mt-6 flex justify-between items-center">
            <button
                onClick={addRow}
                className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors border border-gray-600"
            >
                <span className="text-xl font-bold text-green-400">+</span> Add Date
            </button>
            
            <div className="text-right text-gray-400 text-sm">
                Total Loaves: <span className="text-white font-bold">{totals.totalBig + totals.totalSmall}</span>
            </div>
          </div>
        </div>


        {/* --- RIGHT SECTION: THE CALCULATION PANEL --- */}
        <div className="w-full xl:w-96 space-y-4">
          
          {/* Card 1: Bakery Payable */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl">🍞</div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total to Pay Bakery</h3>
            <div className="text-3xl font-bold text-red-400">
              ₦{totals.payBakery.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Cost: ₦{costBig} (Big) / ₦{costSmall} (Small)
            </p>
          </div>

          {/* Card 2: Client Receivable */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl">🏥</div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Invoice Value</h3>
            <div className="text-3xl font-bold text-blue-400">
              ₦{totals.chargeClient.toLocaleString()}
            </div>
             <p className="text-xs text-gray-500 mt-2">
              Price: ₦{priceBig} (Big) / ₦{priceSmall} (Small)
            </p>
          </div>

          {/* Card 3: Net Profit */}
          <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💰</div>
            <h3 className="text-green-400 text-xs uppercase tracking-wider mb-1">Projected Net Profit</h3>
            <div className="text-4xl font-bold text-green-400">
              ₦{totals.profit.toLocaleString()}
            </div>
            <p className="text-xs text-green-300/60 mt-2">
              Revenue minus Bakery Cost
            </p>
          </div>

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 border-b-4 border-blue-800">
            Save & Generate Report
          </button>

        </div>
      </div>
    </div>
  );
}