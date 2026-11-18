package com.example.backend.controller;

import com.example.backend.dto.ResponsePostDTO;
import com.example.backend.dto.ResponseUserDTO;
import com.example.backend.dto.UserEditRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity getAllUsers() {
        try {
            List<ResponseUserDTO> usersList = userService.selectAllUsers();

            return ResponseEntity.ok(usersList);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/users/{username}")
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
    @GetMapping("/users/{username}/posts")
    public ResponseEntity getAllPostsFromUser(@PathVariable String username) {
        try {
            List<ResponsePostDTO> usersPost = userService.selectAllPostsFromUser(username);

            return ResponseEntity.ok(usersPost);
        } catch (UsernameNotFoundException exception) {
            return ResponseEntity.status(404).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/me")
    public ResponseEntity getLoggedProfile(@AuthenticationPrincipal User user) {
        try {
            ResponseUserDTO usersList = userService.selectUserByUsername(user.getUsername());

            return ResponseEntity.ok(usersList);
        } catch (UsernameNotFoundException exception) {
            return ResponseEntity.status(404).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/me")
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

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping("/me")
    public ResponseEntity updateUser(@AuthenticationPrincipal User user, @RequestBody UserEditRequestDTO userEditRequestDTO) {
        try {
            userService.editUser(user.getEmail(), userEditRequestDTO);

            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (PermissionDeniedException exception) {
            return ResponseEntity.status(403).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
