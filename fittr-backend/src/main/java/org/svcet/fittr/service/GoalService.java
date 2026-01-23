package org.svcet.fittr.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.svcet.fittr.entity.Activity;
import org.svcet.fittr.entity.Goal;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.ActivityRepository;
import org.svcet.fittr.repository.GoalRepository;
import org.svcet.fittr.repository.UserRepository;

@Service
public class GoalService {

    private final GoalRepository goalRepo;
    private final UserRepository userRepo;
    private final ActivityRepository activityRepository;

    public GoalService(
            GoalRepository goalRepo,
            UserRepository userRepo,
            ActivityRepository activityRepository) {

        this.goalRepo = goalRepo;
        this.userRepo = userRepo;
        this.activityRepository = activityRepository;
    }

    // ✅ Save goal
    public Goal save(Goal goal, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        goal.setUser(user);

        if (goal.getGoalType() == null) {
            goal.setGoalType("CALORIES");
        }

        // 🔥 Set start date when goal is created
        if (goal.getCreatedDate() == null) {
            goal.setCreatedDate(LocalDate.now());
        }

        return goalRepo.save(goal);
    }

    // ✅ Get all goals of user
    public List<Goal> getUserGoals(Long userId) {
        return goalRepo.findByUserId(userId);
    }

    // ✅ Delete goal
    public void delete(Long id) {
        goalRepo.deleteById(id);
    }

    // 🔥 TRUE Goal Progress (Correct Logic)
   public double getGoalProgress(Long goalId) {

    Goal goal = goalRepo.findById(goalId)
            .orElseThrow(() -> new RuntimeException("Goal not found"));

    User user = goal.getUser();

    // 🔥 Use targetDate as goal deadline, not createdDate
    LocalDate startDate = goal.getCreatedDate() != null
            ? goal.getCreatedDate()
            : LocalDate.now();

    List<Activity> activities =
            activityRepository.findByUserAndDateGreaterThanEqual(user, startDate);

    int total = 0;

    for (Activity a : activities) {

        // ✅ Normalize names to avoid mismatch
        String activityName = a.getName().toLowerCase().trim();
        String goalActivity = goal.getActivityName().toLowerCase().trim();

        if (!activityName.contains(goalActivity)) {
            continue;
        }

        if ("DURATION".equalsIgnoreCase(goal.getGoalType())) {
            total += a.getDuration();
        } else {
            total += a.getCalories();
        }
    }

    int target = goal.getTargetValue();
    if (target <= 0) return 0;

    double percent = (total * 100.0) / target;
    return Math.min(percent, 100);
}
}