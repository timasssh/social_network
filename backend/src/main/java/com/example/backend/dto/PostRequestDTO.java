package com.example.backend.dto;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Size;

public record PostRequestDTO(@Nonnull @Size(min = 1, max = 31, message = "Invalid title size!") String title, @Nonnull @Size(min = 1, max = 255, message = "Invalid message size!") String message) {
}
