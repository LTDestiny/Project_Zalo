package com.ott.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDBConfig {
    
    @Value("${aws.region}")
    private String awsRegion;
    
    @Value("${aws.access-key}")
    private String awsAccessKey;
    
    @Value("${aws.secret-key}")
    private String awsSecretKey;
    
    @Value("${aws.dynamodb.endpoint:}")
    private String dynamodbEndpoint;
    
    @Bean
    public AmazonDynamoDB amazonDynamoDB() {
        AmazonDynamoDBClientBuilder builder = AmazonDynamoDBClientBuilder.standard();
        
        if (awsAccessKey != null && !awsAccessKey.isEmpty()) {
            AWSCredentials credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
            builder.withCredentials(new AWSStaticCredentialsProvider(credentials));
        }
        
        if (dynamodbEndpoint != null && !dynamodbEndpoint.isEmpty()) {
            builder.withEndpointConfiguration(
                    new AwsClientBuilder.EndpointConfiguration(dynamodbEndpoint, awsRegion));
        } else {
            builder.withRegion(awsRegion);
        }
        
        return builder.build();
    }
    
    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(amazonDynamoDB());
    }
}
