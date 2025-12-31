package com.ott.domain.group.repository;

import com.ott.domain.common.enums.MemberRole;
import com.ott.domain.group.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, UUID> {
    
    List<GroupMember> findByGroupId(UUID groupId);
    
    List<GroupMember> findByUserId(UUID userId);
    
    Optional<GroupMember> findByGroupIdAndUserId(UUID groupId, UUID userId);
    
    List<GroupMember> findByGroupIdAndRole(UUID groupId, MemberRole role);
    
    boolean existsByGroupIdAndUserId(UUID groupId, UUID userId);
}
