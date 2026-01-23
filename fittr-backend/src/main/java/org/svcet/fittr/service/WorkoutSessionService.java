package org.svcet.fittr.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.entity.WorkoutSession;
import org.svcet.fittr.repository.UserRepository;
import org.svcet.fittr.repository.WorkoutSessionRepository;

@Service
public class WorkoutSessionService {

    private final WorkoutSessionRepository repo;
    private final UserRepository userRepo;

    public WorkoutSessionService(
            WorkoutSessionRepository repo,
            UserRepository userRepo) {

        this.repo = repo;
        this.userRepo = userRepo;
    }

    // 🟢 START Workout
    public WorkoutSession startWorkout(Long userId, String activityName) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WorkoutSession ws = new WorkoutSession();
        ws.setUser(user);
        ws.setActivityName(activityName);
        ws.setStartTime(LocalDateTime.now());
        ws.setCompleted(false);

        return repo.save(ws);
    }

    // 🔴 STOP Workout
    public WorkoutSession stopWorkout(Long userId) {

        WorkoutSession ws = repo.findByUserIdAndCompletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("No active workout"));

        ws.setEndTime(LocalDateTime.now());
        ws.setCompleted(true);

        long minutes = Duration.between(ws.getStartTime(), ws.getEndTime()).toMinutes();
        int calories = (int) (minutes * 6);

        ws.setDuration((int) minutes);
        ws.setCaloriesBurned(calories);

        return repo.save(ws);
    }

    // 📄 Get all workout sessions
    public List<WorkoutSession> getAll() {
        return repo.findAll();
    }
}


