package com.zola.domain.message.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.zola.domain.message.model.Emotion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmotionRepository {
    
    private final DynamoDBMapper dynamoDBMapper;
    
    public Emotion save(Emotion emotion) {
        dynamoDBMapper.save(emotion);
        return emotion;
    }
    
    public Emotion findById(String emotionId) {
        return dynamoDBMapper.load(Emotion.class, emotionId);
    }
    
    public void delete(Emotion emotion) {
        dynamoDBMapper.delete(emotion);
    }
}
