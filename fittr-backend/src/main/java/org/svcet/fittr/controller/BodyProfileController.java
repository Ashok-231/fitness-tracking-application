package org.svcet.fittr.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.BodyProfile;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.BodyProfileRepository;
import org.svcet.fittr.repository.UserRepository;

@RestController
@RequestMapping("/api/body-profile")
@CrossOrigin(origins = "*")
public class BodyProfileController {

    @Autowired
    private BodyProfileRepository bodyProfileRepository;

    @Autowired
    private UserRepository userRepository;

    /* ===============================
       Get body profile by userId
    =============================== */
    @GetMapping("/{userId}")
    public BodyProfile getBodyProfile(@PathVariable Long userId) {

        return bodyProfileRepository
                .findByUserId(userId)
                .orElse(null);
    }

    /* ===============================
       Save or update body profile
    =============================== */
    @PostMapping("/{userId}")
    public BodyProfile saveBodyProfile(
            @PathVariable Long userId,
            @RequestBody BodyProfile request) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Calculate BMI in backend (IMPORTANT)
        double heightInMeters = request.getHeight() / 100;
        double bmi = request.getWeight() / (heightInMeters * heightInMeters);

        Optional<BodyProfile> existingProfile =
                bodyProfileRepository.findByUserId(userId);

        BodyProfile profile = existingProfile.orElse(new BodyProfile());

        profile.setUser(user);
        profile.setHeight(request.getHeight());
        profile.setWeight(request.getWeight());
        profile.setBmi(Math.round(bmi * 10.0) / 10.0);

        return bodyProfileRepository.save(profile);
    }
}
