package com.zola.config;

import lombok.Builder;
import lombok.Data;

/**
 * S3 Bucket configuration holder
 * Stores bucket names for different purposes
 */
@Data
@Builder
public class S3BucketNames {
    private String avatars;
    private String messages;
    private String sharedFiles;
    private String analytics;
}
