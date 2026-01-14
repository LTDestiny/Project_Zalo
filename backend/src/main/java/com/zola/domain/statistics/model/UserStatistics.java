package com.zola.domain.statistics.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@DynamoDBTable(tableName = "UserStatistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStatistics {
    
    @DynamoDBHashKey(attributeName = "user_id")
    private String userId;
    
    @DynamoDBRangeKey(attributeName = "period")
    private String period; // Format: YYYY-MM-DD or YYYY-MM
    
    @DynamoDBAttribute(attributeName = "messages_sent")
    private Long messagesSent;
    
    @DynamoDBAttribute(attributeName = "messages_received")
    private Long messagesReceived;
    
    @DynamoDBAttribute(attributeName = "groups_joined")
    private Long groupsJoined;
    
    @DynamoDBAttribute(attributeName = "active_conversations")
    private Long activeConversations;
    
    @DynamoDBAttribute(attributeName = "daily_activity")
    private Map<String, Long> dailyActivity;
    
    @DynamoDBAttribute(attributeName = "last_updated")
    private Long lastUpdated;
}
