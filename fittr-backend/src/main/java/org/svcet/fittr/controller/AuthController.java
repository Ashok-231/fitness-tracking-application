package org.svcet.fittr.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* ===============================
       🔐 LOGIN
    =============================== */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        if (user.getEmail() == null || user.getEmail().isBlank()
                || user.getPassword() == null || user.getPassword().isBlank()) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email and password are required");
        }

        try {
            User loggedInUser = authService.login(
                    user.getEmail(),
                    user.getPassword()
            );

            return ResponseEntity.ok(loggedInUser);

        } catch (RuntimeException ex) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(ex.getMessage());
        }
    }

    /* ===============================
       📝 REGISTER
    =============================== */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // 🔒 Basic validation
        if (user.getName() == null || user.getName().isBlank()
                || user.getEmail() == null || user.getEmail().isBlank()
                || user.getPassword() == null || user.getPassword().isBlank()) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Name, email and password are required");
        }

        // 🛡️ Safe defaults
        if (user.getGender() == null || user.getGender().isBlank()) {
            user.setGender("OTHER");
        }

        try {
            User savedUser = authService.register(user);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedUser);

        } catch (RuntimeException ex) {
            // 👇 THIS IS WHAT YOU WERE MISSING
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(ex.getMessage());
        }
    }
}








