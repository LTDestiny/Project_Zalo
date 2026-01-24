package com.ott;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password123";
        String existingHash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        
        System.out.println("Testing existing hash from V2__sample_data.sql:");
        System.out.println("Password: " + password);
        System.out.println("Existing Hash: " + existingHash);
        
        // Test if existing hash matches password
        boolean matchesExisting = encoder.matches(password, existingHash);
        System.out.println("Existing hash matches 'password123': " + matchesExisting);
        
        System.out.println("\n--- Generating new hash ---");
        String newHash = encoder.encode(password);
        System.out.println("New BCrypt Hash: " + newHash);
        
        // Test new hash
        boolean matchesNew = encoder.matches(password, newHash);
        System.out.println("New hash matches 'password123': " + matchesNew);
    }
}
