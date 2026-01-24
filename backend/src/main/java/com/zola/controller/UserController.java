package com.zola.controller;

import com.zola.domain.common.enums.UserStatus;
import com.zola.domain.user.dto.UpdateProfileRequest;
import com.zola.domain.user.dto.UserDto;
import com.zola.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
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
    
    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }
    
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserDto> updateProfile(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateUserProfile(id, request));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<UserDto> updateStatus(
            @PathVariable UUID id,
            @RequestParam UserStatus status) {
        return ResponseEntity.ok(userService.updateUserStatus(id, status));
    }
    
    @GetMapping("/online")
    public ResponseEntity<List<UserDto>> getOnlineUsers() {
        return ResponseEntity.ok(userService.findByStatus(UserStatus.ONLINE));
    }
    
    @GetMapping("/friends/{userId}")
    public ResponseEntity<List<UserDto>> getFriends(@PathVariable UUID userId) {
        return ResponseEntity.ok(userService.getFriends(userId));
    }
    
    @GetMapping("/check-friendship/{userId1}/{userId2}")
    public ResponseEntity<Boolean> checkFriendship(
            @PathVariable UUID userId1,
            @PathVariable UUID userId2) {
        return ResponseEntity.ok(userService.areFriends(userId1, userId2));
    }
}
