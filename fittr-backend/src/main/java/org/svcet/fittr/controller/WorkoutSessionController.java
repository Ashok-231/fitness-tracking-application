package org.svcet.fittr.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.WorkoutSession;
import org.svcet.fittr.service.WorkoutSessionService;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutSessionController {

    private final WorkoutSessionService service;

    public WorkoutSessionController(WorkoutSessionService service) {
        this.service = service;
    }

    // 🟢 START
    @PostMapping("/start/{userId}")
    public WorkoutSession startWorkout(
            @PathVariable Long userId,
            @RequestBody Map<String, String> body) {

        return service.startWorkout(userId, body.get("activityName"));
    }

    // 🔴 STOP
    @PostMapping("/stop/{userId}")
    public WorkoutSession stopWorkout(@PathVariable Long userId) {
        return service.stopWorkout(userId);
    }
}

