package org.svcet.fittr.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.svcet.fittr.entity.Activity;
import org.svcet.fittr.entity.DailyProgress;
import org.svcet.fittr.entity.User;
import org.svcet.fittr.repository.ActivityRepository;
import org.svcet.fittr.repository.DailyProgressRepository;
import org.svcet.fittr.repository.UserRepository;

@Service
public class DailyProgressService {

    private final ActivityRepository activityRepo;
    private final UserRepository userRepo;
    private final DailyProgressRepository dailyProgressRepo; // keep for compatibility

    public DailyProgressService(
            ActivityRepository activityRepo,
            UserRepository userRepo,
            DailyProgressRepository dailyProgressRepo) {

        this.activityRepo = activityRepo;
        this.userRepo = userRepo;
        this.dailyProgressRepo = dailyProgressRepo;
    }

    // 🔥 Rebuild daily progress from ACTIVITY table
    public List<DailyProgress> getAllForUser(User user) {

        List<Activity> activities = activityRepo.findByUserId(user.getId());

        Map<LocalDate, List<Activity>> grouped =
                activities.stream().collect(Collectors.groupingBy(Activity::getDate));

        List<DailyProgress> result = new ArrayList<>();

        for (LocalDate date : grouped.keySet()) {

            int totalCalories = 0;
            int totalDuration = 0;

            for (Activity a : grouped.get(date)) {
                totalCalories += a.getCalories();
                totalDuration += a.getDuration();
            }

            DailyProgress dp = new DailyProgress();
            dp.setUser(user);
            dp.setDate(date);
            dp.setTotalCalories(totalCalories);
            dp.setTotalDuration(totalDuration);

            result.add(dp);
        }

        result.sort(Comparator.comparing(DailyProgress::getDate));
        return result;
    }
}



