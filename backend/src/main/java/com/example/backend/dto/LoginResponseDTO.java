package com.example.backend.dto;

public record LoginResponseDTO(String accessToken, String tokenType, int expiresIn, ResponseUserDTO user) {
}
