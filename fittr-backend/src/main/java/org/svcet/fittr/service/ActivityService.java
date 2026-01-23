package org.svcet.fittr.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.svcet.fittr.dto.WeeklyProgressDTO;
import org.svcet.fittr.entity.Activity;
import org.svcet.fittr.entity.Category;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.ActivityRepository;
import org.svcet.fittr.repository.CategoryRepository;
import org.svcet.fittr.repository.UserRepository;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ActivityService(
            ActivityRepository activityRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    /* ===============================
       🔥 ADD ACTIVITY
    =============================== */

    @Transactional
    public Activity addActivity(Activity activity, Long userId, String categoryName) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (categoryName == null || categoryName.isBlank()) {
            categoryName = "General";
        }

        Category category = categoryRepository.findByName(categoryName);
        if (category == null) {
            category = new Category();
            category.setName(categoryName);
            category = categoryRepository.save(category);
        }

        activity.setUser(user);
        activity.setCategory(category);

        return activityRepository.save(activity);
    }

    /* ===============================
       🔹 GET USER ACTIVITIES
    =============================== */

    public List<Activity> getUserActivities(Long userId) {
        return activityRepository.findByUserId(userId);
    }

    /* ===============================
       📊 WEEKLY PROGRESS
    =============================== */

    public List<WeeklyProgressDTO> getWeeklyProgress(Long userId) {
        LocalDate start = LocalDate.now().minusDays(6);
        return activityRepository.getWeeklyProgress(userId, start);
    }

    /* ===============================
       🗑 DELETE ACTIVITY
    =============================== */

    @Transactional
    public void deleteActivity(Long activityId, Long userId) {

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (!activity.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized delete");
        }

        activityRepository.delete(activity);
    }

    /* ===============================
       🔥 FILTER METHODS (FIX FOR ERROR)
    =============================== */

    public List<Activity> filterByDate(Long userId, LocalDate date) {
        return activityRepository.findByUserIdAndDate(userId, date);
    }

    public List<Activity> filterByCategory(Long userId, Long categoryId) {
        return activityRepository.findByUserIdAndCategoryId(userId, categoryId);
    }

    public List<Activity> filterByDateRange(
            Long userId,
            LocalDate startDate,
            LocalDate endDate) {

        return activityRepository.findByUserIdAndDateBetween(
                userId, startDate, endDate);
    }

    public List<Activity> filterByCategoryAndDateRange(
            Long userId,
            Long categoryId,
            LocalDate startDate,
            LocalDate endDate) {

        return activityRepository
                .findByUserIdAndCategoryIdAndDateBetween(
                        userId, categoryId, startDate, endDate);
    }

    /* ===============================
       🔹 ADMIN
    =============================== */

    public List<Activity> getAll() {
        return activityRepository.findAll();
    }
}


