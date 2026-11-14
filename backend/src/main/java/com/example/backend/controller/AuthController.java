package com.example.backend.controller;

import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.dto.ResponseUserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor // injeção de dependências via construtor criado pelo Lombok (substitui @Autowired)
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
//        Pattern emailRegexPattern = Pattern.compile("(?:[a-z0-9!#$%&'*+\\x2f=?^_`\\x7b-\\x7d~\\x2d]+(?:\\.[a-z0-9!#$%&'*+\\x2f=?^_`\\x7b-\\x7d~\\x2d]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9\\x2d]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9\\x2d]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\\x2d]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");
//        Matcher matcher = emailRegexPattern.matcher(body.identifier());
//        boolean identifierIsEmail = matcher.matches();
//        TODO: implements verification: identifier is user's username or email?

        User user = repository.findByEmail(body.identifier()).orElseThrow(() -> new RuntimeException("Inválid login provided data!"));
        if(passwordEncoder.matches(user.getPassword(), body.password())) {
            String token = this.tokenService.generateToken(user);

            ResponseUserDTO userDTO = new ResponseUserDTO(user.getUsername(), user.getName(), user.isPremium(), user.getFollowers());
            return ResponseEntity.ok(new LoginResponseDTO(token, "Bearer", 7200, userDTO));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        if (!body.password().equals(body.passwordConfirmation())) {
            return ResponseEntity.badRequest().build();
        }
        if (repository.findByEmail(body.email()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        if (repository.findByUsername(body.username()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setEmail(body.email());
        newUser.setFollowers(0);
        newUser.setName(body.name());
        newUser.setPremium(false);
        newUser.setUsername(body.username());

        this.repository.save(newUser);

        String token = this.tokenService.generateToken(newUser);
        ResponseUserDTO userDTO = new ResponseUserDTO(newUser.getUsername(), newUser.getName(), newUser.isPremium(), newUser.getFollowers());

        return ResponseEntity.ok(new LoginResponseDTO(token, "Bearer", 7200, userDTO));
    }
}
