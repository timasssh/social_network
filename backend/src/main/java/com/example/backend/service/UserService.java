package com.example.backend.service;

import com.example.backend.dto.ResponseUserDTO;
import com.example.backend.dto.UserEditRequestDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.exception.PermissionDeniedException;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    public List<ResponseUserDTO> selectAllUsers() {
        try {
            List<User> allUsers = userRepository.findAll();

            List<ResponseUserDTO> response = new ArrayList<>();
            for (User currentUser : allUsers) {
                response.add(convertUserToDTO(currentUser));
            }

            return response;
        } catch (Exception exception) {
            throw exception;
        }
    }
    public ResponseUserDTO selectUserByUsername(String username) {
        try {
            User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found!"));

            return convertUserToDTO(user);
        } catch (Exception exception
        ) {
            throw exception;
        }
    }
    public void deleteAccount(@NonNull String email) {
        if (email.isBlank()) throw new PermissionDeniedException("Permission denied!");

        try {
            User userToDelete = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Something went wrong!"));

            List<Post> postsToDelete = selectAllPostsFromUser(userToDelete.getUsername());
            for(Post currentPost : postsToDelete) {
                postRepository.delete(currentPost);
            }

            userRepository.delete(userToDelete);
        } catch (Exception exception) {
            throw exception;
        }
    }
    public void editUser(@NonNull String email, UserEditRequestDTO userEditRequestDTO) {
        if (email.isBlank()) throw new PermissionDeniedException("Permission denied!");
        try {
            User userToEdit = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Something went wrong!"));

            userToEdit.setUsername(userEditRequestDTO.username());
            userToEdit.setName(userEditRequestDTO.name());

            userRepository.save(userToEdit);
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<Post> selectAllPostsFromUser(@NonNull String username) {
        if (username.isBlank()) throw new RuntimeException("Something went wrond!");
        if (userRepository.findByUsername(username).isEmpty()) throw new UsernameNotFoundException("User not found!");

        try {
            return postRepository.findAllByAuthor(username);
        } catch (Exception exception) {
            throw exception;
        }
    }

    public @NonNull ResponseUserDTO convertUserToDTO(@NonNull User user) {
        return new ResponseUserDTO(user.getUsername(), user.getName(), user.isPremium(), user.getFollowers());
    }
}
