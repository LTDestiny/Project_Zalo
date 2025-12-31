package com.ott.domain.message.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@DynamoDBTable(tableName = "Emotions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emotion {
    
    @DynamoDBHashKey(attributeName = "emotion_id")
    private String emotionId;
    
    @DynamoDBAttribute(attributeName = "message_id")
    private String messageId;
    
    @DynamoDBAttribute(attributeName = "user_id")
    private String userId;
    
    @DynamoDBAttribute(attributeName = "emotion_type")
    private String emotionType; // LIKE, LOVE, LAUGH, SAD, ANGRY, WOW
    
    @DynamoDBAttribute(attributeName = "timestamp")
    private Long timestamp;
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "message-timestamp-index", attributeName = "message_id")
    public String getMessageIdGsi() {
        return messageId;
    }
}
