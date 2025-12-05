export default function ProfitSummary({ totals, costs, prices }) {
  return (
    <div className="w-full xl:w-96 space-y-4">
      
      {/* Card 1: Bakery Payable */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl">🍞</div>
        <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total to Pay Bakery</h3>
        <div className="text-3xl font-bold text-red-400">
          ₦{totals.payBakery.toLocaleString()}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Cost: ₦{costs.big} (Big) / ₦{costs.small} (Small)
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
          Price: ₦{prices.big} (Big) / ₦{prices.small} (Small)
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
  );
}