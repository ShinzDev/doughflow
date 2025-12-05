import { useState, useEffect } from 'react';

export default function OrderPage() {
  // 1. SETUP: We set your prices here (In the real app, we fetch these from Supabase)
  const PRICING = {
    cost_big: 0.80,   // You pay bakery
    cost_small: 0.40, // You pay bakery
    price_big: 1.20,  // You charge hospital
    price_small: 0.60 // You charge hospital
  };

  // 2. STATE: This holds the rows of data (Date, Big Qty, Small Qty)
  // We start with one empty row so the user sees something immediately.
  const [rows, setRows] = useState([
    { id: 1, date: new Date().toISOString().split('T')[0], big: 0, small: 0 }
  ]);

  // 3. STATE: Holds the calculated totals
  const [totals, setTotals] = useState({
    totalBig: 0,
    totalSmall: 0,
    payBakery: 0,
    chargeClient: 0,
    profit: 0
  });

  // 4. FUNCTION: Adds a new blank row when "+" is clicked
  const addRow = () => {
    const newRow = {
      id: Date.now(), // simple unique ID
      date: new Date().toISOString().split('T')[0],
      big: 0,
      small: 0
    };
    setRows([...rows, newRow]);
  };

  // 5. FUNCTION: Handles typing in the inputs
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        // If it's a number field, ensure it's treated as a number
        const val = field === 'date' ? value : Number(value);
        return { ...row, [field]: val };
      }
      return row;
    });
    setRows(updatedRows);
    
    
  };

  // 6. EFFECT: This runs every time 'rows' changes to update the math automatically
  useEffect(() => {
    // A. Sum up the quantities
    const totalBig = rows.reduce((acc, row) => acc + (row.big || 0), 0);
    const totalSmall = rows.reduce((acc, row) => acc + (row.small || 0), 0);

    // B. Calculate Financials
    // Bakery Cost = (Total Big * Cost Big) + (Total Small * Cost Small)
    const payBakery = (totalBig * PRICING.cost_big) + (totalSmall * PRICING.cost_small);

    // Client Charge = (Total Big * Price Big) + (Total Small * Price Small)
    const chargeClient = (totalBig * PRICING.price_big) + (totalSmall * PRICING.price_small);

    // Profit
    const profit = chargeClient - payBakery;

    setTotals({
      totalBig,
      totalSmall,
      payBakery,
      chargeClient,
      profit
    });
  }, [rows]); // Dependency array: runs whenever 'rows' changes

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
      <h1 className="text-3xl mb-8 font-bold text-gray-100">Bread Supply Entry</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT SECTION: THE INPUT GRID --- */}
        <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-400 border-b border-gray-600 pb-2">
            <div className="text-center">Qty Big Bread</div>
            <div className="text-center">Qty Small Bread</div>
            <div className="text-center">Date</div>
          </div>

          {/* Render the Rows */}
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-3 gap-4 items-center">
                <input
                  type="number"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-xl focus:outline-none focus:border-blue-500"
                  value={row.big || ''} // use || '' to avoid uncontrolled input warning
                  onChange={(e) => handleInputChange(row.id, 'big', e.target.value)}
                />
                <input
                  type="number"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-xl focus:outline-none focus:border-blue-500"
                  value={row.small || ''}
                  onChange={(e) => handleInputChange(row.id, 'small', e.target.value)}
                />
                <input
                  type="date"
                  className="bg-gray-700 border border-gray-600 rounded p-3 text-center text-sm focus:outline-none focus:border-blue-500"
                  value={row.date}
                  onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* The "Add Row" Button */}
          <button
            onClick={addRow}
            className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
          >
            <span className="text-xl font-bold">+</span> Add Date
          </button>

          {/* The Footer Sum */}
          <div className="mt-8 pt-4 border-t border-gray-600 grid grid-cols-3 gap-4">
            <div className="text-center text-2xl font-bold text-blue-400">{totals.totalBig}</div>
            <div className="text-center text-2xl font-bold text-blue-400">{totals.totalSmall}</div>
            <div className="text-center text-gray-500">Total Units</div>
          </div>
        </div>


        {/* --- RIGHT SECTION: THE CALCULATION PANEL --- */}
        <div className="w-full lg:w-96 space-y-4">
          
          {/* Card 1: Bakery Payable */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">To Pay Bakery</h3>
            <div className="text-3xl font-bold text-red-400">
              ${totals.payBakery.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Based on cost: ${PRICING.cost_big} (Big) / ${PRICING.cost_small} (Small)
            </p>
          </div>

          {/* Card 2: Client Receivable */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Invoice Amount</h3>
            <div className="text-3xl font-bold text-blue-400">
              ${totals.chargeClient.toFixed(2)}
            </div>
             <p className="text-xs text-gray-500 mt-2">
              Based on price: ${PRICING.price_big} (Big) / ${PRICING.price_small} (Small)
            </p>
          </div>

          {/* Card 3: Net Profit */}
          <div className="bg-green-900/30 p-6 rounded-xl border border-green-700/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💰</div>
            <h3 className="text-green-400 text-sm uppercase tracking-wider mb-1">Projected Profit</h3>
            <div className="text-4xl font-bold text-green-400">
              ${totals.profit.toFixed(2)}
            </div>
            <p className="text-xs text-green-300/60 mt-2">
              Net revenue after bakery costs
            </p>
          </div>

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95">
            Save & Generate Report
          </button>

        </div>
      </div>
    </div>
  );
}