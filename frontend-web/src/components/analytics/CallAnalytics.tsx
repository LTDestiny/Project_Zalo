import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallAnalytics } from '@/store/analyticsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { AnalyticsFilter } from '@/types/analytics.types';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterBar from './FilterBar';
import StatCard from './StatCard';

const CallAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { calls, loading, error } = useSelector((state: RootState) => state.analytics);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'custom'>('30days');

  useEffect(() => {
    const filter: AnalyticsFilter = { timeRange, platform: 'all' };
    dispatch(fetchCallAnalytics(filter));
  }, [timeRange, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !calls) {
    return <div className="text-red-600">{error || 'No data available'}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Call Analytics</h1>
        <p className="text-gray-600 mt-2">Real-time Stats for Calls</p>
      </div>

      {/* Filter Bar */}
      <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Call Minutes"
          value={calls.totalCallMinutes.toLocaleString()}
          change={calls.callMinutesGrowth}
          icon="📞"
        />
        <StatCard
          label="Success Rate"
          value={`${calls.successRate.toFixed(1)}%`}
          change={calls.successRateGrowth}
          icon="✅"
        />
        <StatCard
          label="Average Duration"
          value={calls.avgDuration}
          change={calls.durationGrowth}
          icon="⏱️"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Peak Calling Hours */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Peak Calling Hours</h2>
          <div className="flex gap-4 mb-4">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
              🎤 Audio
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
              📹 Video
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calls.peakHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="audio" fill="#3B82F6" />
              <Bar dataKey="video" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Call Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Audio Calls', value: calls.callBreakdown.audio },
                  { name: 'Video Calls', value: calls.callBreakdown.video },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Audio Calls</span>
              <span className="font-semibold text-gray-900">{calls.callBreakdown.audio.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Video Calls</span>
              <span className="font-semibold text-gray-900">{calls.callBreakdown.video.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Calling Regions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Calling Regions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calls.topRegions.map((region, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              {region.avatar && (
                <img src={region.avatar} alt={region.region} className="w-8 h-8 rounded-full mr-4" />
              )}
              <div>
                <p className="font-semibold text-gray-900">{region.region}</p>
                <p className="text-sm text-gray-600">{region.calls.toLocaleString()} calls</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Distribution */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Distribution</h2>
        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          [World Map Component - Coming Soon]
        </div>
      </div>
    </div>
  );
};

export default CallAnalytics;
