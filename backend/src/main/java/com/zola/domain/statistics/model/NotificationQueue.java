package com.zola.domain.statistics.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@DynamoDBTable(tableName = "NotificationQueue")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationQueue {
    
    @DynamoDBHashKey(attributeName = "notification_id")
    private String notificationId;
    
    @DynamoDBAttribute(attributeName = "user_id")
    private String userId;
    
    @DynamoDBAttribute(attributeName = "type")
    private String type; // MESSAGE, FRIEND_REQUEST, GROUP_INVITE, SYSTEM
    
    @DynamoDBAttribute(attributeName = "content")
    private String content;
    
    @DynamoDBAttribute(attributeName = "payload")
    private Map<String, String> payload;
    
    @DynamoDBAttribute(attributeName = "is_read")
    private Boolean isRead;
    
    @DynamoDBAttribute(attributeName = "created_at")
    private Long createdAt;
    
    @DynamoDBAttribute(attributeName = "ttl")
    private Long ttl; // 30 days expiration
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "user-created-index", attributeName = "user_id")
    public String getUserIdGsi() {
        return userId;
    }
    
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "user-created-index", attributeName = "created_at")
    public Long getCreatedAtGsi() {
        return createdAt;
    }
}
