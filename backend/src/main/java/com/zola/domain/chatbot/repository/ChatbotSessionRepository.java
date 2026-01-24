package com.zola.domain.chatbot.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.zola.domain.chatbot.model.ChatbotSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ChatbotSessionRepository {
    
    private final DynamoDBMapper dynamoDBMapper;
    
    public ChatbotSession save(ChatbotSession session) {
        dynamoDBMapper.save(session);
        return session;
    }
    
    public ChatbotSession findById(String sessionId) {
        return dynamoDBMapper.load(ChatbotSession.class, sessionId);
    }
    
    public void delete(ChatbotSession session) {
        dynamoDBMapper.delete(session);
    }
}
