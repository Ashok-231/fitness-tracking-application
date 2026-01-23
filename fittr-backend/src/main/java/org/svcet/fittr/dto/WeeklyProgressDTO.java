package org.svcet.fittr.dto;

import java.time.LocalDate;

public class WeeklyProgressDTO {

    private LocalDate day;
    private Long totalDuration;
    private Long totalCalories;

    public WeeklyProgressDTO(LocalDate day, Long totalDuration, Long totalCalories) {
        this.day = day;
        this.totalDuration = totalDuration;
        this.totalCalories = totalCalories;
    }

    public LocalDate getDay() {
        return day;
    }

    public Long getTotalDuration() {
        return totalDuration;
    }

    public Long getTotalCalories() {
        return totalCalories;
    }
}

