package org.svcet.fittr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.Goal;
import org.svcet.fittr.service.GoalService;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    // ✅ Create a new goal for user
    @PostMapping("/user/{userId}")
    public Goal addGoal(@PathVariable Long userId, @RequestBody Goal goal) {
        return goalService.save(goal, userId);
    }

    // ✅ Get all goals of a user
    @GetMapping("/user/{userId}")
    public List<Goal> getUserGoals(@PathVariable Long userId) {
        return goalService.getUserGoals(userId);
    }

    // ✅ Delete a goal
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        goalService.delete(id);
    }

    // 🔥 Get goal progress (correctly calculated)
    @GetMapping("/{id}/progress")
    public double getProgress(@PathVariable Long id) {
        return goalService.getGoalProgress(id);
    }
}



