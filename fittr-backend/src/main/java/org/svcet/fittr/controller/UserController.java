package org.svcet.fittr.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.BodyProgress;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.BodyProgressRepository;
import org.svcet.fittr.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepo;
    private final BodyProgressRepository bodyProgressRepo;

    public UserController(UserRepository userRepo, BodyProgressRepository bodyProgressRepo) {
        this.userRepo = userRepo;
        this.bodyProgressRepo = bodyProgressRepo;
    }

    // 🔥 Save Height, Weight, BMI + Track History
    @PutMapping("/{id}/body")
    public User updateBody(
            @PathVariable Long id,
            @RequestBody Map<String, Double> body) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Double height = body.get("height");
        Double weight = body.get("weight");

        if (height == null || weight == null) {
            throw new RuntimeException("Height and Weight are required");
        }

        double bmi = weight / Math.pow(height / 100.0, 2);

        // Update User profile
        user.setHeight(height);
        user.setWeight(weight);
        user.setBmi(bmi);
        userRepo.save(user);

        // Save BMI history
        BodyProgress progress = new BodyProgress();
        progress.setUser(user);
        progress.setHeight(height);
        progress.setWeight(weight);
        progress.setBmi(bmi);
        progress.setDate(LocalDate.now());

        bodyProgressRepo.save(progress);

        return user;
    }

    // 🔥 Get current user profile
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 🔥 Get BMI history for chart
    @GetMapping("/{id}/body-history")
    public List<BodyProgress> getBodyHistory(@PathVariable Long id) {
        return bodyProgressRepo.findByUserIdOrderByDateAsc(id);
    }
}

