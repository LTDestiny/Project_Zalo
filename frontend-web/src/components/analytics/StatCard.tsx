import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon, trend = 'up' }) => {
  const trendColor =
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  const trendBg =
    trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={`text-sm mt-3 ${trendColor} font-semibold`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        </div>
        <div className={`text-3xl ${trendBg} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
