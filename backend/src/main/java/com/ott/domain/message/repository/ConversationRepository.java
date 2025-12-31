package com.ott.domain.message.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.ott.domain.message.model.Conversation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ConversationRepository {
    
    private final DynamoDBMapper dynamoDBMapper;
    
    public Conversation save(Conversation conversation) {
        dynamoDBMapper.save(conversation);
        return conversation;
    }
    
    public Conversation findById(String conversationId, String type) {
        return dynamoDBMapper.load(Conversation.class, conversationId, type);
    }
    
    public void delete(Conversation conversation) {
        dynamoDBMapper.delete(conversation);
    }
}
