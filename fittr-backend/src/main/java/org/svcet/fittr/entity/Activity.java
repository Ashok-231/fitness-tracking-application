package org.svcet.fittr.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "activities")
public class Activity {

    /* ===============================
       🔑 PRIMARY KEY
    =============================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ===============================
       🏃 ACTIVITY DETAILS
    =============================== */

    // e.g. Running, Cycling, Yoga
    private String name;

    // duration in seconds
    private int duration;

    private int calories;

    // 🔥 ALWAYS REQUIRED
    private LocalDate date;

    /* ===============================
       📂 CATEGORY
    =============================== */

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("activities")
    private Category category;

    /* ===============================
       👤 USER (MANDATORY)
    =============================== */

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({ "activities", "goals" })
    private User user;

    /* ===============================
       🔄 AUTO SET DATE
    =============================== */

    @PrePersist
    public void prePersist() {
        if (this.date == null) {
            this.date = LocalDate.now();
        }
    }

    /* ===============================
       GETTERS & SETTERS
    =============================== */

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getDuration() {
        return duration;
    }

    public int getCalories() {
        return calories;
    }

    public LocalDate getDate() {
        return date;
    }

    public Category getCategory() {
        return category;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setUser(User user) {
        this.user = user;
    }
}







