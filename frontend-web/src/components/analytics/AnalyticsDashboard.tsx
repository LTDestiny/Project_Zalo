import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboards } from '@/store/analyticsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { AnalyticsFilter } from '@/types/analytics.types';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import StatCard from './StatCard';
import FilterBar from './FilterBar';

const AnalyticsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboard, filter, loading, error } = useSelector((state: RootState) => state.analytics);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'custom'>('30days');

  useEffect(() => {
    const analyticsFilter: AnalyticsFilter = {
      timeRange,
      platform: 'all',
    };
    dispatch(fetchDashboards(analyticsFilter));
  }, [timeRange, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return <div>No data available</div>;
  }

  const userData = [
    { metric: 'Total Users', day: 'Mon', value: 2.0 },
    { metric: 'Total Users', day: 'Tue', value: 2.1 },
    { metric: 'Total Users', day: 'Wed', value: 2.15 },
    { metric: 'Total Users', day: 'Thu', value: 2.2 },
    { metric: 'Total Users', day: 'Fri', value: 2.3 },
    { metric: 'Total Users', day: 'Sat', value: 2.4 },
  ];

  const messageTypes = [
    { name: 'Text Messages', value: 65 },
    { name: 'Images & Media', value: 22 },
    { name: 'Video Clips', value: 8 },
    { name: 'Voice Messages', value: 5 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Zalo Enterprise - Real-time performance metrics</p>
      </div>

      {/* Filter Bar */}
      <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Users"
          value={dashboard.totalUsers.toLocaleString()}
          change={dashboard.userGrowth}
          icon="👥"
        />
        <StatCard
          label="DAU"
          value={dashboard.dau.toLocaleString()}
          change={dashboard.dauGrowth}
          icon="📊"
        />
        <StatCard
          label="Messages per Day"
          value={dashboard.messagesPerDay.toLocaleString()}
          change={dashboard.messageGrowth}
          icon="💬"
        />
        <StatCard
          label="Active Groups"
          value={dashboard.activeGroups.toLocaleString()}
          change={dashboard.groupGrowth}
          icon="👫"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth & Message Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Total Users (M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Message Types Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={messageTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {messageTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Messages', href: '/analytics/messages', icon: '💬' },
          { label: 'Users', href: '/analytics/users', icon: '👥' },
          { label: 'Groups', href: '/analytics/groups', icon: '👫' },
          { label: 'Calls', href: '/analytics/calls', icon: '☎️' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition cursor-pointer"
          >
            <p className="text-2xl mb-2">{item.icon}</p>
            <p className="text-gray-900 font-medium">{item.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
