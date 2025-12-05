'use client'

import { useState, useEffect } from 'react';

// Import our new components
import PricingSettings from './components/pricingsettings';
import OrderGrid from './components/ordergrid';
import ProfitSummary from './components/profitsummary';

export default function OrderPage() {

  // --- 1. STATE ---
  const [costBig, setCostBig] = useState(240);    
  const [costSmall, setCostSmall] = useState(180); 
  const [priceBig, setPriceBig] = useState(280);   
  const [priceSmall, setPriceSmall] = useState(200); 

  const [rows, setRows] = useState([
    { id: 1, date: new Date().toISOString().split('T')[0], big: 0, small: 0 }
  ]);

  const [totals, setTotals] = useState({
    totalBig: 0, totalSmall: 0, payBakery: 0, chargeClient: 0, profit: 0
  });

  // --- 2. LOGIC ---
  const addRow = () => {
    const newRow = {
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0],
      big: 0, small: 0
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

  useEffect(() => {
    const totalBig = rows.reduce((acc, row) => acc + (row.big || 0), 0);
    const totalSmall = rows.reduce((acc, row) => acc + (row.small || 0), 0);
    const payBakery = (totalBig * costBig) + (totalSmall * costSmall);
    const chargeClient = (totalBig * priceBig) + (totalSmall * priceSmall);
    const profit = chargeClient - payBakery;

    setTotals({ totalBig, totalSmall, payBakery, chargeClient, profit });
  }, [rows, costBig, costSmall, priceBig, priceSmall]); 

  // --- 3. RENDER ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-mono">
      <h1 className="text-3xl mb-6 font-bold text-gray-100 border-b border-gray-700 pb-4">
        Bread Supply Manager
      </h1>

      {/* COMPONENT 1: The Settings */}
      <PricingSettings 
        costBig={costBig} setCostBig={setCostBig}
        costSmall={costSmall} setCostSmall={setCostSmall}
        priceBig={priceBig} setPriceBig={setPriceBig}
        priceSmall={priceSmall} setPriceSmall={setPriceSmall}
      />

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* COMPONENT 2: The Grid */}
        <OrderGrid 
          rows={rows} 
          handleInputChange={handleInputChange} 
          addRow={addRow} 
          totalLoaves={totals.totalBig + totals.totalSmall}
        />

        {/* COMPONENT 3: The Summary */}
        <ProfitSummary 
          totals={totals}
          costs={{ big: costBig, small: costSmall }}
          prices={{ big: priceBig, small: priceSmall }}
          rows={rows}
        />
        
      </div>
    </div>
  );
}