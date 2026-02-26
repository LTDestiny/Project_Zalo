import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupAnalytics } from '@/store/analyticsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { AnalyticsFilter } from '@/types/analytics.types';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterBar from './FilterBar';
import StatCard from './StatCard';

const GroupAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading, error } = useSelector((state: RootState) => state.analytics);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'custom'>('30days');

  useEffect(() => {
    const filter: AnalyticsFilter = { timeRange, platform: 'all' };
    dispatch(fetchGroupAnalytics(filter));
  }, [timeRange, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !groups) {
    return <div className="text-red-600">{error || 'No data available'}</div>;
  }

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'ultra-high':
        return 'bg-red-500';
      case 'high':
        return 'bg-blue-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getTrendBadge = (trend?: string) => {
    if (!trend) return null;
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
        trend === 'trending'
          ? 'bg-green-100 text-green-800'
          : trend === 'steady'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-red-100 text-red-800'
      }`}>
        {trend.charAt(0).toUpperCase() + trend.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Groups Analytics</h1>
        <p className="text-gray-600 mt-2">Real-time performance metrics across all communities</p>
      </div>

      {/* Filter Bar */}
      <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Groups"
          value={groups.totalGroups.toLocaleString()}
          change={groups.monthlyGrowth}
          icon="👫"
        />
        <StatCard
          label="Monthly Growth"
          value={`+${groups.monthlyGrowth}`}
          change={4.2}
          icon="📈"
        />
        <StatCard
          label="Avg. Activity"
          value={`${groups.avgActivity}%`}
          change={0}
          icon="⚡"
          trend="stable"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groups.categoryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Privacy Type Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Type Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Public', value: groups.privacyStats.public },
                  { name: 'Private', value: groups.privacyStats.private },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#6B7280" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{groups.privacyStats.public}%</p>
              <p className="text-gray-600 text-sm">Public</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{groups.privacyStats.private}%</p>
              <p className="text-gray-600 text-sm">Private</p>
            </div>
          </div>
        </div>
      </div>

      {/* Most Active Groups */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Most Active Groups</h2>
          <a href="#" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            View All Groups →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Group Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Members</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {groups.activeGroups.slice(0, 5).map((group) => (
                <tr key={group.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {group.avatar && (
                        <img src={group.avatar} alt={group.name} className="w-8 h-8 rounded-full mr-3" />
                      )}
                      <span className="font-medium text-gray-900">{group.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{group.category}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">{group.members}</span>
                      <span className="text-gray-500 text-sm ml-2">members</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getActivityColor(group.activityLevel)}`}></div>
                      <span className="text-gray-700 capitalize">{group.activityLevel.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getTrendBadge(group.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupAnalytics;
