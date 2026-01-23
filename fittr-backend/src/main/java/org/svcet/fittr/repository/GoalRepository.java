package org.svcet.fittr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.Goal;
import org.svcet.fittr.entity.User;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    // 🔥 Get all goals of a user
    List<Goal> findByUser(User user);

    // 🔥 Get all goals by user id (used by controller)
    List<Goal> findByUserId(Long userId);

    // 🔥 Used internally for goal calculations
    List<Goal> findByUserAndGoalType(User user, String goalType);
}
