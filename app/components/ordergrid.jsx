export default function OrderGrid({ rows, handleInputChange, addRow, totalLoaves }) {
  return (
    <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-400 border-b border-gray-600 pb-2">
        <div className="text-center font-bold text-blue-400">Qty Big Bread</div>
        <div className="text-center font-bold text-amber-400">Qty Small Bread</div>
        <div className="text-center">Date</div>
      </div>

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

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={addRow}
          className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors border border-gray-600"
        >
          <span className="text-xl font-bold text-green-400">+</span> Add Date
        </button>
        
        <div className="text-right text-gray-400 text-sm">
          Total Loaves: <span className="text-white font-bold">{totalLoaves}</span>
        </div>
      </div>
    </div>
  );
}