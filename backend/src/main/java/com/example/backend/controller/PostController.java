package com.example.backend.controller;

import com.example.backend.dto.PostEditRequestDTO;
import com.example.backend.dto.PostRequestDTO;
import com.example.backend.dto.ResponsePostDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            List<Post> postList = postService.selectAllPosts();

            return ResponseEntity.ok(postList);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity getPost(@PathVariable Long id) {
        try {
            Post post = postService.selectPostById(id);

            return ResponseEntity.ok(post);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

//    @PostMapping
//    public ResponseEntity createPost(@AuthenticationPrincipal User user, @RequestBody PostRequestDTO postRequestDTO) {
//        try {
//            ResponsePostDTO responsePostDTO = postService.savePost(postRequestDTO, user);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body(responsePostDTO);
//        } catch (Exception exception) {
//            return ResponseEntity.badRequest().body(exception.getMessage());
//        }
//    }

//    @PatchMapping("/{id}")
//    public ResponseEntity updatePost(@AuthenticationPrincipal User user, @RequestBody PostEditRequestDTO postEditRequestDTO, @PathVariable Long id) {
//        try {
//            Post post = postService.editPostMessage(postEditRequestDTO, id, user.getUsername());
//
//            return ResponseEntity.status(HttpStatus.ACCEPTED).body(post);
//        } catch (PermissionDeniedException exception) {
//            return ResponseEntity.status(401).body(exception.getMessage());
//        } catch (Exception exception) {
//            return ResponseEntity.badRequest().body(exception.getMessage());
//        }
//    }

//    @DeleteMapping("/${id}")
//    public ResponseEntity deletePost(@AuthenticationPrincipal User user, @PathVariable Long id) {
//        try {
//            postService.deletePost(id, user.getUsername());
//
//            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
//        } catch (PermissionDeniedException exception) {
//            return ResponseEntity.status(401).body(exception.getMessage());
//        } catch (Exception exception) {
//            return ResponseEntity.badRequest().body(exception.getMessage());
//        }
//    }
}
