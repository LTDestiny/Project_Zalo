package com.zola.controller;

import com.zola.domain.analytics.dto.*;
import com.zola.domain.analytics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardAnalyticsDTO> getDashboard(
            @RequestParam(defaultValue = "30days") String timeRange) {
        AnalyticsFilterDTO filter = new AnalyticsFilterDTO();
        filter.setTimeRange(timeRange);
        return ResponseEntity.ok(analyticsService.getDashboardAnalytics(filter));
    }

    @GetMapping("/messages")
    public ResponseEntity<MessageAnalyticsDTO> getMessageAnalytics(
            @RequestParam(defaultValue = "30days") String timeRange) {
        AnalyticsFilterDTO filter = new AnalyticsFilterDTO();
        filter.setTimeRange(timeRange);
        return ResponseEntity.ok(analyticsService.getMessageAnalytics(filter));
    }

    @GetMapping("/users")
    public ResponseEntity<UserAnalyticsDTO> getUserAnalytics(
            @RequestParam(defaultValue = "30days") String timeRange) {
        AnalyticsFilterDTO filter = new AnalyticsFilterDTO();
        filter.setTimeRange(timeRange);
        return ResponseEntity.ok(analyticsService.getUserAnalytics(filter));
    }

    @GetMapping("/groups")
    public ResponseEntity<GroupAnalyticsDTO> getGroupAnalytics(
            @RequestParam(defaultValue = "30days") String timeRange) {
        AnalyticsFilterDTO filter = new AnalyticsFilterDTO();
        filter.setTimeRange(timeRange);
        return ResponseEntity.ok(analyticsService.getGroupAnalytics(filter));
    }

    @GetMapping("/calls")
    public ResponseEntity<CallAnalyticsDTO> getCallAnalytics(
            @RequestParam(defaultValue = "30days") String timeRange) {
        AnalyticsFilterDTO filter = new AnalyticsFilterDTO();
        filter.setTimeRange(timeRange);
        return ResponseEntity.ok(analyticsService.getCallAnalytics(filter));
    }

    @GetMapping("/export/{section}")
    public ResponseEntity<byte[]> exportAnalytics(
            @PathVariable String section,
            @RequestParam(defaultValue = "30days") String timeRange,
            @RequestParam(defaultValue = "csv") String format) {
        // Implementation for export functionality
        return ResponseEntity.ok().build();
    }
}
