package com.zola.domain.message.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.zola.domain.message.model.MediaMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MediaMetadataRepository {
    
    private final DynamoDBMapper dynamoDBMapper;
    
    public MediaMetadata save(MediaMetadata mediaMetadata) {
        dynamoDBMapper.save(mediaMetadata);
        return mediaMetadata;
    }
    
    public MediaMetadata findById(String mediaId) {
        return dynamoDBMapper.load(MediaMetadata.class, mediaId);
    }
    
    public void delete(MediaMetadata mediaMetadata) {
        dynamoDBMapper.delete(mediaMetadata);
    }
}
