'use client' 

// Import the PDF library and our new design
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

export default function ProfitSummary({ totals, costs, prices, rows }) {
  
  // We need to pass 'rows' into this component now so the PDF knows what to print!
  
  return (
    <div className="w-full xl:w-96 space-y-4">
      
      {/* ... (Keep your Card 1, Card 2, and Card 3 exactly the same) ... */}
      
      {/* Card 1: Bakery Payable */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
        <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total to Pay Bakery</h3>
        <div className="text-3xl font-bold text-red-400">₦{totals.payBakery.toLocaleString()}</div>
      </div>

      {/* Card 2: Client Receivable */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
        <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Invoice Value</h3>
        <div className="text-3xl font-bold text-blue-400">₦{totals.chargeClient.toLocaleString()}</div>
      </div>

      {/* Card 3: Net Profit */}
      <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30 shadow-lg relative overflow-hidden">
        <h3 className="text-green-400 text-xs uppercase tracking-wider mb-1">Projected Net Profit</h3>
        <div className="text-4xl font-bold text-green-400">₦{totals.profit.toLocaleString()}</div>
      </div>

      {/* --- THE PDF BUTTON --- */}
      {/* We use Client Side Rendering check to avoid server errors */}
      
      <div className="w-full">
        <PDFDownloadLink 
          document={<InvoicePDF rows={rows} totals={totals} prices={prices} />} 
          fileName={`Invoice_${new Date().toISOString().split('T')[0]}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <button 
              className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 border-b-4 
                ${loading ? 'bg-gray-500 border-gray-700 cursor-wait' : 'bg-blue-600 hover:bg-blue-500 border-blue-800'}`
              }
            >
              {loading ? 'Generating PDF...' : 'Download Invoice PDF 📄'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

    </div>
  );
}