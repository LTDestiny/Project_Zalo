package com.ott.domain.user.repository;

import com.ott.domain.common.enums.ActivityType;
import com.ott.domain.user.entity.UserActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, UUID> {
    
    Page<UserActivity> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
    
    List<UserActivity> findByUserIdAndType(UUID userId, ActivityType type);
    
    List<UserActivity> findByUserIdAndCreatedAtBetween(UUID userId, LocalDateTime start, LocalDateTime end);
}
