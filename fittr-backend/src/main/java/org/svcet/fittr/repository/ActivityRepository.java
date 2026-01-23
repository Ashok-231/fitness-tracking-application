package org.svcet.fittr.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.svcet.fittr.dto.WeeklyProgressDTO;
import org.svcet.fittr.entity.Activity;
import org.svcet.fittr.entity.User;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    /* ===============================
       🔹 BASIC USER QUERIES
    =============================== */

    // All activities of a user (by userId)
    List<Activity> findByUserId(Long userId);

    // All activities of a user (entity-based)
    List<Activity> findByUser(User user);

    // Activities after a certain date (used for goals)
    List<Activity> findByUserAndDateGreaterThanEqual(User user, LocalDate date);

    // Delete activity securely (ownership check)
    void deleteByIdAndUserId(Long id, Long userId);

    /* ===============================
       📊 ANALYTICS (USER)
    =============================== */

    // Weekly progress (used for charts)
    @Query("""
        SELECT new org.svcet.fittr.dto.WeeklyProgressDTO(
            a.date,
            COALESCE(SUM(a.duration), 0),
            COALESCE(SUM(a.calories), 0)
        )
        FROM Activity a
        WHERE a.user.id = :userId
          AND a.date >= :startDate
        GROUP BY a.date
        ORDER BY a.date
    """)
    List<WeeklyProgressDTO> getWeeklyProgress(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate
    );

    // Total calories burned by a user
    @Query("""
        SELECT COALESCE(SUM(a.calories), 0)
        FROM Activity a
        WHERE a.user.id = :userId
    """)
    int getTotalCaloriesByUser(@Param("userId") Long userId);

    /* ===============================
       🔥 ACTIVITY FILTERS (USER)
    =============================== */

    // Filter by exact date
    List<Activity> findByUserIdAndDate(Long userId, LocalDate date);

    // Filter by category
    List<Activity> findByUserIdAndCategoryId(Long userId, Long categoryId);

    // Filter by date range
    List<Activity> findByUserIdAndDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Filter by category + date range
    List<Activity> findByUserIdAndCategoryIdAndDateBetween(
            Long userId,
            Long categoryId,
            LocalDate startDate,
            LocalDate endDate
    );

    /* ===============================
       🛡️ ADMIN DASHBOARD QUERIES
    =============================== */

    // Total number of activities (all users)
    @Query("SELECT COUNT(a) FROM Activity a")
    long countAllActivities();

    // Total calories burned (all users)
    @Query("SELECT COALESCE(SUM(a.calories), 0) FROM Activity a")
    long getTotalCalories();
}
