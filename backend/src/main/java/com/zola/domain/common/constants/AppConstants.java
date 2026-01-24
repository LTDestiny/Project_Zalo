package com.zola.domain.common.constants;

public class AppConstants {
    
    // JWT Constants
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";
    public static final long JWT_EXPIRATION_MS = 86400000L; // 24 hours
    
    // WebSocket Constants
    public static final String WS_MESSAGE_ENDPOINT = "/topic/messages";
    public static final String WS_USER_STATUS_ENDPOINT = "/topic/user-status";
    public static final String WS_NOTIFICATION_ENDPOINT = "/topic/notifications";
    
    // File Upload Constants
    public static final long MAX_FILE_SIZE = 10485760L; // 10MB
    public static final String[] ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif"};
    public static final String[] ALLOWED_VIDEO_TYPES = {"video/mp4", "video/avi", "video/mov"};
    public static final String[] ALLOWED_DOCUMENT_TYPES = {"application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"};
    
    // S3 Constants
    public static final String S3_BUCKET_AVATARS = "avatars";
    public static final String S3_BUCKET_MESSAGES = "messages";
    public static final String S3_BUCKET_DOCUMENTS = "documents";
    
    // Cache Constants
    public static final String CACHE_USER = "users";
    public static final String CACHE_GROUP = "groups";
    public static final String CACHE_CONVERSATION = "conversations";
    public static final int CACHE_TTL_SECONDS = 3600; // 1 hour
    
    // Pagination Constants
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MAX_PAGE_SIZE = 100;
    
    // DynamoDB Constants
    public static final String DYNAMODB_TABLE_MESSAGES = "Messages";
    public static final String DYNAMODB_TABLE_CONVERSATIONS = "Conversations";
    public static final String DYNAMODB_TABLE_CHATBOT_SESSIONS = "ChatbotSessions";
    public static final String DYNAMODB_TABLE_EMOTIONS = "Emotions";
    public static final String DYNAMODB_TABLE_MEDIA_METADATA = "MediaMetadata";
    public static final String DYNAMODB_TABLE_USER_STATISTICS = "UserStatistics";
    public static final String DYNAMODB_TABLE_NOTIFICATIONS = "NotificationQueue";
    
    private AppConstants() {
        throw new IllegalStateException("Constants class");
    }
}
