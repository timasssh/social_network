package com.example.backend.controller;

import com.example.backend.dto.ResponseUserDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity getAllUsers() {
        try {
            List<ResponseUserDTO> usersList = userService.selectAllUsers();

            return ResponseEntity.ok(usersList);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/{username}")
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        try {
            ResponseUserDTO usersList = userService.selectUserByUsername(username);

            return ResponseEntity.ok(usersList);
        } catch (UsernameNotFoundException exception) {
            return ResponseEntity.status(404).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/{username}/posts")
    public ResponseEntity getAllPostsFromUser(@PathVariable String username) {
        try {
            List<Post> usersPost = userService.selectAllPostsFromUser(username);

            return ResponseEntity.ok(usersPost);
        } catch (UsernameNotFoundException exception) {
            return ResponseEntity.status(404).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@AuthenticationPrincipal User user) {
        try {
            userService.deleteAccount(user.getEmail());

            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (PermissionDeniedException exception) {
            return ResponseEntity.status(403).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
