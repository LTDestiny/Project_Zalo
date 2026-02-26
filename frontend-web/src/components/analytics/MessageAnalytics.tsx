import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageAnalytics } from '@/store/analyticsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { AnalyticsFilter } from '@/types/analytics.types';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import FilterBar from './FilterBar';
import StatCard from './StatCard';

const MessageAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector((state: RootState) => state.analytics);
  const [timeRange, setTimeRange] = React.useState<'7days' | '30days' | 'custom'>('30days');

  useEffect(() => {
    const filter: AnalyticsFilter = { timeRange, platform: 'all' };
    dispatch(fetchMessageAnalytics(filter));
  }, [timeRange, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !messages) {
    return <div className="text-red-600">{error || 'No data available'}</div>;
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Message Analytics</h1>
        <p className="text-gray-600 mt-2">Monitor engagement levels and message volume</p>
      </div>

      {/* Filter Bar */}
      <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Messages"
          value={messages.totalMessages.toLocaleString()}
          change={0}
          icon="💬"
        />
        <StatCard
          label="Active Groups"
          value={messages.activeGroups.toLocaleString()}
          change={0}
          icon="👫"
        />
        <StatCard
          label="Response Rate"
          value={`${messages.responseRate.toFixed(1)}%`}
          change={0}
          icon="✅"
        />
        <StatCard
          label="Daily Avg."
          value={messages.dailyAvg.toLocaleString()}
          change={0}
          icon="📊"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Volume Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Volume</h2>
          <p className="text-gray-600 text-sm mb-4">Activity trends for the last 30 days</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messages.volumeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Message Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Types Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={messages.messageTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percentage }) => `${type}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {messages.messageTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Breakdown</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Positive', value: messages.sentimentBreakdown.positive },
                    { name: 'Neutral', value: messages.sentimentBreakdown.neutral },
                    { name: 'Negative', value: messages.sentimentBreakdown.negative },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#6B7280" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Activity Hours */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Peak Activity Hours</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={messages.peakActivityHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MessageAnalytics;
