package com.zola.domain.group.dto;

import com.zola.domain.common.enums.GroupType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupDto {
    private UUID id;
    private String name;
    private String description;
    private String avatarUrl;
    private UUID createdBy;
    private GroupType type;
    private LocalDateTime createdAt;
    private int memberCount;
}
