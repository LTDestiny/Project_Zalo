package com.ott.domain.group.repository;

import com.ott.domain.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<Group, UUID> {
    
    List<Group> findByCreatedBy(UUID createdBy);
    
    List<Group> findByNameContainingIgnoreCase(String name);
}
