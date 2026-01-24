package com.zola.domain.message.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@DynamoDBTable(tableName = "Conversations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conversation {
    
    @DynamoDBHashKey(attributeName = "conversation_id")
    private String conversationId;
    
    @DynamoDBRangeKey(attributeName = "type")
    private String type; // DIRECT or GROUP
    
    @DynamoDBAttribute(attributeName = "participant_ids")
    private List<String> participantIds;
    
    @DynamoDBAttribute(attributeName = "last_message_id")
    private String lastMessageId;
    
    @DynamoDBAttribute(attributeName = "last_message_preview")
    private String lastMessagePreview;
    
    @DynamoDBAttribute(attributeName = "last_message_time")
    private Long lastMessageTime;
    
    @DynamoDBAttribute(attributeName = "unread_counts")
    private Map<String, Integer> unreadCounts;
    
    @DynamoDBAttribute(attributeName = "created_at")
    private Long createdAt;
    
    @DynamoDBAttribute(attributeName = "updated_at")
    private Long updatedAt;
}
