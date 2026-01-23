package org.svcet.fittr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.svcet.fittr.entity.DailyProgress;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.UserRepository;
import org.svcet.fittr.service.DailyProgressService;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:3000")
public class DailyProgressController {

    private final DailyProgressService service;
    private final UserRepository userRepo;

    public DailyProgressController(DailyProgressService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    // 🔥 Return FULL history (needed for charts & daily progress)
    @GetMapping("/user/{userId}")
    public List<DailyProgress> getAll(@PathVariable Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.getAllForUser(user);   // <- this is the real fix
    }
}






