package com.example.backend.repository;

import com.example.backend.entity.Like;
import com.example.backend.entity.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {
    @Modifying
    @Query(value = "INSERT INTO likes (post_id, user_id) VALUES (:postId, :userId)", nativeQuery = true)
    void insertLike(@Param("postId") Long postId, @Param("userId") String userId);

    @Modifying
    @Query(value = "DELETE FROM likes WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    void deleteLike(@Param("postId") Long postId, @Param("userId") String userId);

    boolean existsByPost_IdAndUser_Id(Long postId, String userId);

    long countByPost_Id(Long postId);
}
