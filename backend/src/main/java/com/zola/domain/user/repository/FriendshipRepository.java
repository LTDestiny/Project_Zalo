package com.zola.domain.user.repository;

import com.zola.domain.common.enums.FriendshipStatus;
import com.zola.domain.user.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, UUID> {
    
    @Query("SELECT f FROM Friendship f WHERE (f.userId1 = :userId OR f.userId2 = :userId) AND f.status = :status")
    List<Friendship> findFriendshipsByUserIdAndStatus(UUID userId, FriendshipStatus status);
    
    @Query("SELECT f FROM Friendship f WHERE ((f.userId1 = :userId1 AND f.userId2 = :userId2) OR (f.userId1 = :userId2 AND f.userId2 = :userId1))")
    Optional<Friendship> findFriendshipBetweenUsers(UUID userId1, UUID userId2);
}
