package com.zola.domain.message.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.zola.domain.common.enums.MessageStatus;
import com.zola.domain.common.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@DynamoDBTable(tableName = "Messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    
    @DynamoDBHashKey(attributeName = "message_id")
    private String messageId;
    
    @DynamoDBRangeKey(attributeName = "conversation_id")
    private String conversationId;
    
    @DynamoDBAttribute(attributeName = "sender_id")
    private String senderId;
    
    @DynamoDBTypeConvertedEnum
    @DynamoDBAttribute(attributeName = "type")
    private MessageType type;
    
    @DynamoDBAttribute(attributeName = "content")
    private String content;
    
    @DynamoDBAttribute(attributeName = "media_url")
    private String mediaUrl;
    
    @DynamoDBAttribute(attributeName = "metadata")
    private Map<String, String> metadata;
    
    @DynamoDBAttribute(attributeName = "timestamp")
    private Long timestamp;
    
    @DynamoDBTypeConvertedEnum
    @DynamoDBAttribute(attributeName = "status")
    private MessageStatus status;
    
    @DynamoDBAttribute(attributeName = "read_by")
    private List<String> readBy;
    
    @DynamoDBAttribute(attributeName = "reply_to_message_id")
    private String replyToMessageId;
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "conversation-timestamp-index", attributeName = "conversation_id")
    public String getConversationIdGsi() {
        return conversationId;
    }
    
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "conversation-timestamp-index", attributeName = "timestamp")
    public Long getTimestampGsi() {
        return timestamp;
    }
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "sender-timestamp-index", attributeName = "sender_id")
    public String getSenderIdGsi() {
        return senderId;
    }
}
