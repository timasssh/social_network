package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.LikeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{id}/like")
public class LikeController {
    @Autowired
    private LikeService likeService;

    // TODO: terminar rotas de like e corrigir erros nas rotas 'get all posts' e 'get post by id'

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity likePost(@AuthenticationPrincipal User user, @PathVariable Long id) {
        try {
            likeService.createLike(id, user.getId());

            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping
    public ResponseEntity dislikePost(@AuthenticationPrincipal User user, @PathVariable Long id) {
        try {
            likeService.deleteLike(id, user.getId());

            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
