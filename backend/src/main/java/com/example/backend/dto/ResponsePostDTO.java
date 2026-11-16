package com.example.backend.dto;

public record ResponsePostDTO(Long id, String title, String message, String author, int likes) {
}
