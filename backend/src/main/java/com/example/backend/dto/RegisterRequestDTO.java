package com.example.backend.dto;

public record RegisterRequestDTO(String name, String username, String email, String password, String passwordConfirmation) {
}
