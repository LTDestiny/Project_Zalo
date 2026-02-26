// Analytics Dashboard Types

export interface AnalyticsDashboard {
  totalUsers: number;
  dau: number; // Daily Active Users
  messagesPerDay: number;
  activeGroups: number;
  userGrowth: number; // percentage
  dauGrowth: number;
  messageGrowth: number;
  groupGrowth: number;
}

export interface MessageAnalytics {
  totalMessages: number;
  activeGroups: number;
  responseRate: number;
  dailyAvg: number;
  volumeTrend: ChartDataPoint[];
  messageTypes: MessageTypeBreakdown[];
  sentimentBreakdown: SentimentStats;
  peakActivityHours: HourlyStats[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface MessageTypeBreakdown {
  type: 'text' | 'image' | 'video' | 'voice';
  count: number;
  percentage: number;
}

export interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
}

export interface HourlyStats {
  hour: number | string;
  value: number;
}

export interface UserAnalytics {
  newUsers: number;
  churnRate: number;
  avgEngagement: number;
  totalMessages: number;
  newUsersGrowth: number;
  churnGrowth: number;
  engagementTrend: ChartDataPoint[];
  activeUsers: UserData[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'idle' | 'inactive';
  platform: string;
  lastActive: string;
  engagementScore: number;
  avatar?: string;
}

export interface GroupAnalytics {
  totalGroups: number;
  monthlyGrowth: number;
  avgActivity: number;
  categoryBreakdown: CategoryStats[];
  privacyStats: PrivacyStats;
  activeGroups: GroupData[];
}

export interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
}

export interface PrivacyStats {
  public: number;
  private: number;
}

export interface GroupData {
  id: string;
  name: string;
  category: string;
  members: number;
  activityLevel: 'ultra-high' | 'high' | 'medium' | 'low';
  status: string;
  avatar?: string;
  trend?: 'trending' | 'steady' | 'declining';
}

export interface CallAnalytics {
  totalCallMinutes: number;
  successRate: number;
  avgDuration: string;
  callMinutesGrowth: number;
  successRateGrowth: number;
  durationGrowth: number;
  peakHours: PeakHourData[];
  callBreakdown: CallBreakdownData;
  topRegions: RegionData[];
}

export interface PeakHourData {
  hour: string;
  audio: number;
  video: number;
}

export interface CallBreakdownData {
  audio: number;
  video: number;
}

export interface RegionData {
  region: string;
  calls: number;
  avatar?: string;
}

export interface AnalyticsFilter {
  timeRange: '7days' | '30days' | 'custom';
  region?: string;
  platform?: 'all' | 'web' | 'ios' | 'android';
  startDate?: string;
  endDate?: string;
}

export interface AnalyticsState {
  dashboard: AnalyticsDashboard | null;
  messages: MessageAnalytics | null;
  users: UserAnalytics | null;
  groups: GroupAnalytics | null;
  calls: CallAnalytics | null;
  filter: AnalyticsFilter;
  loading: boolean;
  error: string | null;
}
