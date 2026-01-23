package org.svcet.fittr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.WorkoutSession;

public interface WorkoutSessionRepository
        extends JpaRepository<WorkoutSession, Long> {

    // 🔥 Find active workout for a user
    Optional<WorkoutSession> findByUserIdAndCompletedFalse(Long userId);
}
