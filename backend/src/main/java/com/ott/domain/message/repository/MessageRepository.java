package com.ott.domain.message.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.ott.domain.message.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class MessageRepository {
    
    private final DynamoDBMapper dynamoDBMapper;
    
    public Message save(Message message) {
        dynamoDBMapper.save(message);
        return message;
    }
    
    public Message findById(String messageId, String conversationId) {
        return dynamoDBMapper.load(Message.class, messageId, conversationId);
    }
    
    public List<Message> findByConversationId(String conversationId, int limit) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":conversationId", new AttributeValue().withS(conversationId));
        
        DynamoDBQueryExpression<Message> queryExpression = new DynamoDBQueryExpression<Message>()
                .withIndexName("conversation-timestamp-index")
                .withConsistentRead(false)
                .withKeyConditionExpression("conversation_id = :conversationId")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false)
                .withLimit(limit);
        
        return dynamoDBMapper.query(Message.class, queryExpression);
    }
    
    public List<Message> findBySenderId(String senderId, int limit) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":senderId", new AttributeValue().withS(senderId));
        
        DynamoDBQueryExpression<Message> queryExpression = new DynamoDBQueryExpression<Message>()
                .withIndexName("sender-timestamp-index")
                .withConsistentRead(false)
                .withKeyConditionExpression("sender_id = :senderId")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false)
                .withLimit(limit);
        
        return dynamoDBMapper.query(Message.class, queryExpression);
    }
    
    public void delete(Message message) {
        dynamoDBMapper.delete(message);
    }
}
