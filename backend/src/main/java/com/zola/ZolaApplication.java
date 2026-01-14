package com.zola;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableCaching
@EnableJpaRepositories(basePackages = "com.zola.domain")
public class ZolaApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ZolaApplication.class, args);
    }
}
