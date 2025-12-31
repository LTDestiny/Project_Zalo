package com.ott;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableCaching
@EnableJpaRepositories(basePackages = "com.ott.domain")
public class OttApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(OttApplication.class, args);
    }
}
