package com.example.backend.controller;

import com.example.backend.dto.PostEditRequestDTO;
import com.example.backend.dto.PostRequestDTO;
import com.example.backend.dto.ResponsePostDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.service.PostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity getAllPosts() {
        try {
            List<ResponsePostDTO> postList = postService.selectAllPosts();

            return ResponseEntity.ok(postList);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity getPost(@PathVariable Long id) {
        try {
            ResponsePostDTO post = postService.selectPostById(id);

            return ResponseEntity.ok(post);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity createPost(@AuthenticationPrincipal User user, @RequestBody PostRequestDTO postRequestDTO) {
        try {
            ResponsePostDTO responsePostDTO = postService.savePost(postRequestDTO, user);

            return ResponseEntity.status(HttpStatus.CREATED).body(responsePostDTO);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping("/{id}")
    public ResponseEntity updatePost(@AuthenticationPrincipal User user, @RequestBody PostEditRequestDTO postEditRequestDTO, @PathVariable Long id) {
        try {
            Post post = postService.editPostMessage(postEditRequestDTO, id, user.getUsername());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(post);
        } catch (PermissionDeniedException exception) {
            return ResponseEntity.status(401).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@AuthenticationPrincipal User user, @PathVariable Long id) {
        try {
            postService.deletePost(id, user.getUsername());

            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (PermissionDeniedException exception) {
            return ResponseEntity.status(403).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
