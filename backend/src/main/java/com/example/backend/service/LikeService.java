package com.example.backend.service;

import com.example.backend.repository.LikeRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public void createLike(@NonNull Long postId, @NonNull String user_id) throws Exception {
        try {
            likeRepository.insertLike(postId, user_id);
        } catch (Exception exception) {
            throw new Exception("Failed to like post! " + exception.getMessage());
        }
    }
    public void deleteLike(@NonNull Long postId, @NonNull String user_id) throws Exception {
        try {
            likeRepository.deleteLike(postId, user_id);
        } catch (Exception exception) {
            throw new Exception("Failed to dislike post! " + exception.getMessage());
        }
    }

    public boolean isPostLikedByUser(@NonNull Long postId, @NonNull String user_id) throws Exception {
        try {
            return likeRepository.existsByPost_IdAndUser_Id(postId, user_id);
        } catch (Exception exception) {
            throw new Exception("Failed to get post likes!" + exception.getMessage());
        }
    }
    public long getPostLikes(@NonNull Long postId) throws Exception {
        try {
            return likeRepository.countByPost_Id(postId);
        } catch (Exception exception) {
            throw new Exception("Failed to get post likes!" + exception.getMessage());
        }
    }
}
