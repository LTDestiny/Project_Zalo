import React from 'react';

interface FilterBarProps {
  timeRange: '7days' | '30days' | 'custom';
  setTimeRange: (range: '7days' | '30days' | 'custom') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ timeRange, setTimeRange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8 flex justify-between items-center">
      <div>
        <label className="text-gray-700 font-medium mr-4">Time Range:</label>
        <div className="inline-flex gap-2">
          {(['7days', '30days', 'custom'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7days' ? '7 Days' : range === '30days' ? 'Last 30 Days' : 'Custom'}
            </button>
          ))}
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
        <span>📥</span> Export Data
      </button>
    </div>
  );
};

export default FilterBar;
