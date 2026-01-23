package org.svcet.fittr.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    /* ===============================
       🔐 LOGIN (SECURE)
    =============================== */
    public User login(String email, String rawPassword) {

        String cleanEmail = email.trim().toLowerCase();

        User user = userRepo.findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        // 🔒 BCrypt password check
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    /* ===============================
       📝 REGISTER (SECURE & STABLE)
    =============================== */
    @Transactional
    public User register(User user) {

        // 🔧 Normalize email
        String cleanEmail = user.getEmail().trim().toLowerCase();

        // 🔒 Prevent duplicate email (FAST + SAFE)
        if (userRepo.existsByEmail(cleanEmail)) {
            throw new RuntimeException("Email already registered");
        }

        // 🔐 Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 🔧 Set normalized email
        user.setEmail(cleanEmail);

        // 🛡️ Default role
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        // 🔧 Default gender
        if (user.getGender() == null || user.getGender().isBlank()) {
            user.setGender("OTHER");
        }

        // dob, goal, height, weight, bmi → allowed to be null

        return userRepo.save(user);
    }
}





