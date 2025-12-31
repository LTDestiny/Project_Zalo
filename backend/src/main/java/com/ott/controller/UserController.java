package com.ott.controller;

import com.ott.domain.user.dto.UserDto;
import com.ott.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findById(id));
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }
    
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserDto> updateProfile(
            @PathVariable UUID id,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String avatarUrl) {
        return ResponseEntity.ok(userService.updateProfile(id, phoneNumber, avatarUrl));
    }
}
