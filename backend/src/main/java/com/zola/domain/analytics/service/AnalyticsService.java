package com.zola.domain.analytics.service;

import com.zola.domain.analytics.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class AnalyticsService {

    @Autowired
    private EntityManager entityManager;

    public DashboardAnalyticsDTO getDashboardAnalytics(AnalyticsFilterDTO filter) {
        DashboardAnalyticsDTO dashboard = new DashboardAnalyticsDTO();
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = getStartDate(filter.getTimeRange(), endDate);
        
        // Query total users
        Long totalUsers = (Long) entityManager
            .createQuery("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate")
            .setParameter("startDate", startDate.atStartOfDay())
            .getSingleResult();
        
        dashboard.setTotalUsers(totalUsers != null ? totalUsers : 0);
        dashboard.setDau(totalUsers != null ? (long)(totalUsers * 0.65) : 0); // Estimate DAU
        dashboard.setMessagesPerDay(15200000L); // Sample data
        dashboard.setActiveGroups(45000L); // Sample data
        dashboard.setUserGrowth(5.0);
        dashboard.setDauGrowth(2.0);
        dashboard.setMessageGrowth(12.0);
        dashboard.setGroupGrowth(8.0);
        
        return dashboard;
    }

    public MessageAnalyticsDTO getMessageAnalytics(AnalyticsFilterDTO filter) {
        MessageAnalyticsDTO analytics = new MessageAnalyticsDTO();
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = getStartDate(filter.getTimeRange(), endDate);
        
        analytics.setTotalMessages(1284332L);
        analytics.setActiveGroups(842L);
        analytics.setResponseRate(94.2);
        analytics.setDailyAvg(42800L);
        
        // Volume trend data
        analytics.setVolumeTrend(generateChartData(startDate, endDate));
        
        // Message types
        List<MessageTypeBreakdownDTO> types = new ArrayList<>();
        types.add(new MessageTypeBreakdownDTO("text", 837216L, 65.0));
        types.add(new MessageTypeBreakdownDTO("image", 282752L, 22.0));
        types.add(new MessageTypeBreakdownDTO("video", 102746L, 8.0));
        types.add(new MessageTypeBreakdownDTO("voice", 64218L, 5.0));
        analytics.setMessageTypes(types);
        
        // Sentiment
        SentimentStatsDTO sentiment = new SentimentStatsDTO(64.0, 28.0, 8.0);
        analytics.setSentimentBreakdown(sentiment);
        
        // Peak hours
        analytics.setPeakActivityHours(generatePeakHours());
        
        return analytics;
    }

    public UserAnalyticsDTO getUserAnalytics(AnalyticsFilterDTO filter) {
        UserAnalyticsDTO analytics = new UserAnalyticsDTO();
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = getStartDate(filter.getTimeRange(), endDate);
        
        analytics.setNewUsers(1284L);
        analytics.setChurnRate(2.4);
        analytics.setAvgEngagement(78.2);
        analytics.setTotalMessages(42800L);
        analytics.setNewUsersGrowth(12.0);
        analytics.setChurnGrowth(-0.5);
        
        // Engagement trend
        analytics.setEngagementTrend(generateChartData(startDate, endDate));
        
        // Active users
        analytics.setActiveUsers(generateActiveUsers());
        
        return analytics;
    }

    public GroupAnalyticsDTO getGroupAnalytics(AnalyticsFilterDTO filter) {
        GroupAnalyticsDTO analytics = new GroupAnalyticsDTO();
        
        analytics.setTotalGroups(1245L);
        analytics.setMonthlyGrowth(850.0);
        analytics.setAvgActivity(84.0);
        
        // Category breakdown
        List<CategoryStatsDTO> categories = new ArrayList<>();
        categories.add(new CategoryStatsDTO("Personal", 540, 43.0));
        categories.add(new CategoryStatsDTO("Work", 410, 33.0));
        categories.add(new CategoryStatsDTO("Community", 295, 24.0));
        analytics.setCategoryBreakdown(categories);
        
        // Privacy stats
        PrivacyStatsDTO privacy = new PrivacyStatsDTO(70.0, 30.0);
        analytics.setPrivacyStats(privacy);
        
        // Active groups
        analytics.setActiveGroups(generateActiveGroups());
        
        return analytics;
    }

    public CallAnalyticsDTO getCallAnalytics(AnalyticsFilterDTO filter) {
        CallAnalyticsDTO analytics = new CallAnalyticsDTO();
        
        analytics.setTotalCallMinutes(12450L);
        analytics.setSuccessRate(98.2);
        analytics.setAvgDuration("4m 32s");
        analytics.setCallMinutesGrowth(12.5);
        analytics.setSuccessRateGrowth(0.4);
        analytics.setDurationGrowth(-2.1);
        
        // Peak hours
        analytics.setPeakHours(generatePeakCallHours());
        
        // Call breakdown
        CallBreakdownDTO breakdown = new CallBreakdownDTO(8864L, 3486L);
        analytics.setCallBreakdown(breakdown);
        
        // Top regions
        analytics.setTopRegions(generateTopRegions());
        
        return analytics;
    }

    private LocalDate getStartDate(String timeRange, LocalDate endDate) {
        if ("7days".equals(timeRange)) {
            return endDate.minus(7, ChronoUnit.DAYS);
        } else if ("30days".equals(timeRange)) {
            return endDate.minus(30, ChronoUnit.DAYS);
        } else {
            return endDate.minus(30, ChronoUnit.DAYS);
        }
    }

    private List<ChartDataPointDTO> generateChartData(LocalDate startDate, LocalDate endDate) {
        List<ChartDataPointDTO> data = new ArrayList<>();
        LocalDate current = startDate;
        Random random = new Random();
        
        while (!current.isAfter(endDate)) {
            ChartDataPointDTO point = new ChartDataPointDTO(
                current.toString(),
                2000000 + random.nextInt(500000)
            );
            data.add(point);
            current = current.plus(1, ChronoUnit.DAYS);
        }
        
        return data;
    }

    private List<HourlyStatsDTO> generatePeakHours() {
        List<HourlyStatsDTO> hours = new ArrayList<>();
        String[] dayOfWeek = {"MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"};
        Random random = new Random();
        
        for (String day : dayOfWeek) {
            hours.add(new HourlyStatsDTO(day, 1000 + random.nextInt(500)));
        }
        
        return hours;
    }

    private List<UserDataDTO> generateActiveUsers() {
        List<UserDataDTO> users = new ArrayList<>();
        String[] names = {"Sarah Williams", "Mark Thompson", "David Chen", "Elena Rodriguez"};
        String[] statuses = {"active", "idle", "inactive"};
        String[] platforms = {"iOS (v14.2)", "Web Dashboard", "Android (v11.0)"};
        
        for (int i = 0; i < names.length; i++) {
            UserDataDTO user = new UserDataDTO();
            user.setId(String.valueOf(i + 1));
            user.setName(names[i]);
            user.setEmail(names[i].toLowerCase().replace(" ", ".") + "@enterprise.com");
            user.setStatus(statuses[i % statuses.length]);
            user.setPlatform(platforms[i % platforms.length]);
            user.setLastActive(i == 0 ? "2 mins ago" : (i + 1) * 4 + " hours ago");
            user.setEngagementScore(70 + i * 5);
            users.add(user);
        }
        
        return users;
    }

    private List<GroupDataDTO> generateActiveGroups() {
        List<GroupDataDTO> groups = new ArrayList<>();
        
        GroupDataDTO group1 = new GroupDataDTO();
        group1.setId("1");
        group1.setName("Tech Innovators HQ");
        group1.setCategory("Work");
        group1.setMembers(1400);
        group1.setActivityLevel("ultra-high");
        group1.setStatus("Ultra High");
        group1.setTrend("trending");
        groups.add(group1);
        
        GroupDataDTO group2 = new GroupDataDTO();
        group2.setId("2");
        group2.setName("Weekend Hikers");
        group2.setCategory("Community");
        group2.setMembers(850);
        group2.setActivityLevel("high");
        group2.setStatus("High");
        group2.setTrend("steady");
        groups.add(group2);
        
        GroupDataDTO group3 = new GroupDataDTO();
        group3.setId("3");
        group3.setName("Productivity Sprint");
        group3.setCategory("Personal");
        group3.setMembers(1600);
        group3.setActivityLevel("medium");
        group3.setStatus("Medium");
        group3.setTrend("active");
        groups.add(group3);
        
        return groups;
    }

    private List<PeakHourDataDTO> generatePeakCallHours() {
        List<PeakHourDataDTO> hours = new ArrayList<>();
        String[] timeSlots = {"12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"};
        Random random = new Random();
        
        for (String slot : timeSlots) {
            PeakHourDataDTO data = new PeakHourDataDTO(
                slot,
                100 + random.nextInt(200),
                50 + random.nextInt(100)
            );
            hours.add(data);
        }
        
        return hours;
    }

    private List<RegionDataDTO> generateTopRegions() {
        List<RegionDataDTO> regions = new ArrayList<>();
        regions.add(new RegionDataDTO("United States", 5240, null));
        regions.add(new RegionDataDTO("United Kingdom", 2110, null));
        regions.add(new RegionDataDTO("Germany", 1890, null));
        return regions;
    }
}
