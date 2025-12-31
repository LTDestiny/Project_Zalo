package com.ott.domain.message.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@DynamoDBTable(tableName = "MediaMetadata")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaMetadata {
    
    @DynamoDBHashKey(attributeName = "media_id")
    private String mediaId;
    
    @DynamoDBAttribute(attributeName = "message_id")
    private String messageId;
    
    @DynamoDBAttribute(attributeName = "uploader_id")
    private String uploaderId;
    
    @DynamoDBAttribute(attributeName = "file_name")
    private String fileName;
    
    @DynamoDBAttribute(attributeName = "file_type")
    private String fileType;
    
    @DynamoDBAttribute(attributeName = "file_size")
    private Long fileSize;
    
    @DynamoDBAttribute(attributeName = "storage_path")
    private String storagePath; // S3 path
    
    @DynamoDBAttribute(attributeName = "thumbnail_url")
    private String thumbnailUrl;
    
    @DynamoDBAttribute(attributeName = "processing_status")
    private Map<String, String> processingStatus;
    
    @DynamoDBAttribute(attributeName = "uploaded_at")
    private Long uploadedAt;
    
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "message-index", attributeName = "message_id")
    public String getMessageIdGsi() {
        return messageId;
    }
}
