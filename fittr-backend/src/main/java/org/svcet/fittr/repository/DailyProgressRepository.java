package org.svcet.fittr.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.DailyProgress;
import org.svcet.fittr.entity.User;

public interface DailyProgressRepository extends JpaRepository<DailyProgress, Long> {

    Optional<DailyProgress> findByUserAndDate(User user, LocalDate date);

    // 🔥 Needed for charts & history
    List<DailyProgress> findByUserOrderByDateAsc(User user);

    // 🔥 Needed for goal progress (ONLY from goal date)
    List<DailyProgress> findByUserAndDateGreaterThanEqualOrderByDateAsc(User user, LocalDate date);
}

