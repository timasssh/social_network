package com.example.backend.service;

import com.example.backend.dto.PostEditRequestDTO;
import com.example.backend.dto.PostRequestDTO;
import com.example.backend.dto.ResponsePostDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Post selectPostById(Long id) throws RuntimeException{
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found!"));
    }
    public List<Post> selectAllPosts() {
        return postRepository.findAll();
    }
    public ResponsePostDTO savePost(PostRequestDTO postRequestDTO, @NonNull User user) throws Exception {
        Post newPost = convertDTOToPost(postRequestDTO, user.getUsername());

        try {
            postRepository.save(newPost);

            return convertPostToDTO(newPost);
        } catch (Exception exception) {
            throw new Exception("Failed to save post!");
        }
    }
    public Post editPostMessage(PostEditRequestDTO postEditRequestDTO, Long id, String author) throws Exception { // TODO: fazer verificação de autoria do post pelo ID e não pelo campo username
        Post postToEdit = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found!"));

        if (!postToEdit.getAuthor().equals(author)){
            throw new PermissionDeniedException("Permission to edit post denied");
        }

        postToEdit.setMessage(postEditRequestDTO.newMessage());
        try {
            postRepository.save(postToEdit);

            return postToEdit;
        } catch (Exception exception) {
            throw new Exception("Failed to edit post!");
        }
    }
    public void deletePost(Long id, String author) throws Exception {
        Post postToDelete = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found!"));

        if (!postToDelete.getAuthor().equals(author)){
            throw new PermissionDeniedException("Permission to delete post denied");
        }

        try {
            postRepository.delete(postToDelete);
        } catch (Exception exception) {
            throw new Exception("Failed to edit post!");
        }
    }

    private @NonNull Post convertDTOToPost(@NonNull PostRequestDTO postRequestDTO, String postAuthor) {
        Post newPost = new Post();

        newPost.setTitle(postRequestDTO.title());
        newPost.setMessage(postRequestDTO.message());
        newPost.setLikes(0);
        newPost.setAuthor(postAuthor);

        return newPost;
    }
    private @NonNull ResponsePostDTO convertPostToDTO(@NonNull Post postToConvert) {
        return new ResponsePostDTO(postToConvert.getId(), postToConvert.getTitle(), postToConvert.getMessage(), postToConvert.getAuthor(), postToConvert.getLikes());
    }
}
