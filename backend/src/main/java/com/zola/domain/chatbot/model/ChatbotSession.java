package com.zola.domain.chatbot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@DynamoDBTable(tableName = "ChatbotSessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatbotSession {
    
    @DynamoDBHashKey(attributeName = "session_id")
    private String sessionId;
    
    @DynamoDBAttribute(attributeName = "user_id")
    private String userId;
    
    @DynamoDBAttribute(attributeName = "conversation_id")
    private String conversationId;
    
    @DynamoDBAttribute(attributeName = "message_history")
    private List<Map<String, String>> messageHistory;
    
    @DynamoDBAttribute(attributeName = "context")
    private Map<String, String> context;
    
    @DynamoDBAttribute(attributeName = "ai_model")
    private String aiModel;
    
    @DynamoDBAttribute(attributeName = "created_at")
    private Long createdAt;
    
    @DynamoDBAttribute(attributeName = "expires_at")
    private Long expiresAt; // TTL
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "user-created-index", attributeName = "user_id")
    public String getUserIdGsi() {
        return userId;
    }
    
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "user-created-index", attributeName = "created_at")
    public Long getCreatedAtGsi() {
        return createdAt;
    }
}
