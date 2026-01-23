package org.svcet.fittr.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.dto.WeeklyProgressDTO;
import org.svcet.fittr.entity.Activity;
import org.svcet.fittr.service.ActivityService;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    /* ===============================
       🔹 ADD ACTIVITY (STOP & SAVE)
    =============================== */
    @PostMapping("/user/{userId}")
    public Activity addActivity(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> body) {

        Activity activity = new Activity();

        // ✅ REQUIRED FIELDS
        activity.setName((String) body.get("name"));
        activity.setDuration(((Number) body.get("duration")).intValue());
        activity.setCalories(((Number) body.get("calories")).intValue());

        // ✅ DATE (OPTIONAL from frontend)
        if (body.get("date") != null) {
            activity.setDate(LocalDate.parse(body.get("date").toString()));
        } // else @PrePersist will auto-set today

        // ✅ CATEGORY (OPTIONAL)
        String categoryName = body.get("category") != null
                ? body.get("category").toString()
                : null;

        return activityService.addActivity(activity, userId, categoryName);
    }

    /* ===============================
       🔹 GET USER ACTIVITIES
    =============================== */
    @GetMapping("/user/{userId}")
    public List<Activity> getUserActivities(@PathVariable Long userId) {
        return activityService.getUserActivities(userId);
    }

    /* ===============================
       🔹 WEEKLY PROGRESS
    =============================== */
    @GetMapping("/user/{userId}/weekly")
    public List<WeeklyProgressDTO> getWeekly(@PathVariable Long userId) {
        return activityService.getWeeklyProgress(userId);
    }

    /* ===============================
       🔹 DELETE ACTIVITY
    =============================== */
    @DeleteMapping("/user/{userId}/{activityId}")
    public void deleteActivity(
            @PathVariable Long userId,
            @PathVariable Long activityId) {
        activityService.deleteActivity(activityId, userId);
    }

    /* ===============================
       🔥 ACTIVITY FILTER
    =============================== */
    @GetMapping("/filter")
    public List<Activity> filterActivities(
            @RequestParam Long userId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        // 📅 Filter by exact date
        if (date != null) {
            return activityService.filterByDate(
                    userId,
                    LocalDate.parse(date)
            );
        }

        // 🏃 Filter by category
        if (categoryId != null && startDate == null && endDate == null) {
            return activityService.filterByCategory(userId, categoryId);
        }

        // 📆 Filter by date range
        if (startDate != null && endDate != null && categoryId == null) {
            return activityService.filterByDateRange(
                    userId,
                    LocalDate.parse(startDate),
                    LocalDate.parse(endDate)
            );
        }

        // 🏃📆 Filter by category + date range
        if (categoryId != null && startDate != null && endDate != null) {
            return activityService.filterByCategoryAndDateRange(
                    userId,
                    categoryId,
                    LocalDate.parse(startDate),
                    LocalDate.parse(endDate)
            );
        }

        // 🔁 Default: all activities
        return activityService.getUserActivities(userId);
    }

    /* ===============================
       🔹 ADMIN (OPTIONAL)
    =============================== */
    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAll();
    }
}







    
