package com.zola.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * AWS S3 Configuration for file storage
 * Supports multiple buckets for different purposes:
 * - Avatars (user and group profile images)
 * - Messages (attachments: images, videos, documents)
 * - Shared Files (group shared files)
 * - Analytics (data exports and reports)
 */
@Configuration
public class S3Config {
    
    @Value("${aws.region}")
    private String awsRegion;
    
    @Value("${aws.access-key}")
    private String awsAccessKey;
    
    @Value("${aws.secret-key}")
    private String awsSecretKey;
    
    @Value("${aws.s3.bucket.avatars}")
    private String avatarsBucket;
    
    @Value("${aws.s3.bucket.messages}")
    private String messagesBucket;
    
    @Value("${aws.s3.bucket.shared-files}")
    private String sharedFilesBucket;
    
    @Value("${aws.s3.bucket.analytics:#{null}}")
    private String analyticsBucket;
    
    @Bean
    public AmazonS3 amazonS3() {
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard();
        
        if (awsAccessKey != null && !awsAccessKey.isEmpty()) {
            AWSCredentials credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
            builder.withCredentials(new AWSStaticCredentialsProvider(credentials));
        }
        
        builder.withRegion(awsRegion);
        
        return builder.build();
    }
    
    @Bean
    public S3BucketNames s3BucketNames() {
        return S3BucketNames.builder()
                .avatars(avatarsBucket)
                .messages(messagesBucket)
                .sharedFiles(sharedFilesBucket)
                .analytics(analyticsBucket)
                .build();
    }
}
