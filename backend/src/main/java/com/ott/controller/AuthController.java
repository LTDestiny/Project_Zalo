package com.ott.controller;

import com.ott.domain.user.dto.LoginRequest;
import com.ott.domain.user.dto.RegisterRequest;
import com.ott.domain.user.dto.UserDto;
import com.ott.domain.user.service.UserService;
import com.ott.exception.ResourceNotFoundException;
import com.ott.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserDto user = userService.register(request);
            String token = jwtTokenProvider.generateToken(user.getId(), user.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Try to find user by username or email
            UserDto user = null;
            try {
                user = userService.findByUsername(request.getUsernameOrEmail());
            } catch (ResourceNotFoundException e) {
                // If not found by username, try by email
                try {
                    user = userService.findByEmail(request.getUsernameOrEmail());
                } catch (ResourceNotFoundException ex) {
                    Map<String, Object> error = new HashMap<>();
                    error.put("error", "Invalid username or password");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
                }
            }
            
            if (user == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            // TODO: Verify password with passwordEncoder
            // For now, just generate token
            String token = jwtTokenProvider.generateToken(user.getId(), user.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String username = jwtTokenProvider.getUsernameFromToken(token);
            UserDto user = userService.findByUsername(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
