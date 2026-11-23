package com.example.backend.repository;

import com.example.backend.entity.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByAuthor_Username(String username);

    @Modifying
    @Transactional
    @Query("update Post set likes = likes + 1 where id = :id")
    void incrementPostLikes(@Param(value = "id") Long id);

    @Modifying
    @Transactional
    @Query("update Post set likes = likes - 1 where id = :id")
    void decrementPostLikes(@Param(value = "id") Long id);
}
