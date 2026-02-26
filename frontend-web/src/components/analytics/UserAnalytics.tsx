import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAnalytics } from '@/store/analyticsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { AnalyticsFilter } from '@/types/analytics.types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterBar from './FilterBar';
import StatCard from './StatCard';

const UserAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.analytics);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'custom'>('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filter: AnalyticsFilter = { timeRange, platform: 'all' };
    dispatch(fetchUserAnalytics(filter));
  }, [timeRange, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !users) {
    return <div className="text-red-600">{error || 'No data available'}</div>;
  }

  const filteredUsers = users.activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Analytics</h1>
        <p className="text-gray-600 mt-2">Monitor engagement levels and churn across your user base.</p>
      </div>

      {/* Filter Bar */}
      <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="New Users"
          value={users.newUsers.toLocaleString()}
          change={users.newUsersGrowth}
          icon="👤"
        />
        <StatCard
          label="Churn Rate"
          value={`${users.churnRate.toFixed(1)}%`}
          change={users.churnGrowth}
          icon="📉"
        />
        <StatCard
          label="Avg Engagement"
          value={users.avgEngagement.toFixed(1)}
          change={0}
          icon="⚡"
          trend="stable"
        />
        <StatCard
          label="Total Messages"
          value={users.totalMessages.toLocaleString()}
          change={0}
          icon="💬"
        />
      </div>

      {/* Engagement Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={users.engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} name="Engagement Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Active Users</h2>
          <input
            type="text"
            placeholder="Search users or segments..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Active</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Engagement Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                      ● {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {user.platform === 'ios'
                      ? 'iOS'
                      : user.platform === 'android'
                        ? 'Android'
                        : 'Web Dashboard'}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{user.lastActive}</td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${user.engagementScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{user.engagementScore}</p>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gray-600 hover:text-gray-900">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
