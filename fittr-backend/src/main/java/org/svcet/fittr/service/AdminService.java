package org.svcet.fittr.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.svcet.fittr.repository.ActivityRepository;
import org.svcet.fittr.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public AdminService(UserRepository userRepository,
                        ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    /* ===============================
       🛡️ ADMIN DASHBOARD STATS
    =============================== */
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        /* ===============================
           👥 USERS
        =============================== */
        long totalUsers = userRepository.count();
        long adminUsers = userRepository.countByRole("ROLE_ADMIN");
        long normalUsers = userRepository.countByRole("ROLE_USER");

        /* ===============================
           🏃 ACTIVITIES
        =============================== */
        long totalActivities = activityRepository.countAllActivities();

        /* ===============================
           🔥 CALORIES
        =============================== */
        Long calories = activityRepository.getTotalCalories();
        long totalCalories = (calories != null) ? calories : 0L;

        /* ===============================
           📊 RESPONSE MAP
        =============================== */
        stats.put("totalUsers", totalUsers);
        stats.put("adminUsers", adminUsers);
        stats.put("normalUsers", normalUsers);
        stats.put("totalActivities", totalActivities);
        stats.put("totalCalories", totalCalories);

        return stats;
    }
}
