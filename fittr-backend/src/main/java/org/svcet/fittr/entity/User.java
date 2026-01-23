package org.svcet.fittr.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    /* ===============================
       🔑 BASIC USER INFO
    =============================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // 🔐 ACCEPTED in request, NEVER returned in response
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false, length = 100)
    private String password;

    /* ===============================
       🛡️ ROLE MANAGEMENT
    =============================== */

    @Column(nullable = false)
    private String role = "USER";

    /* ===============================
       🧍 PERSONAL DETAILS
    =============================== */

    // MALE / FEMALE / OTHER
    private String gender;

    // React <input type="date" />
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    // LOSE_WEIGHT / GAIN_MUSCLE / STAY_FIT
    private String goal;

    /* ===============================
       🔥 BODY PROFILE
    =============================== */

    private Double height;
    private Double weight;
    private Double bmi;

    /* ===============================
       🔧 CONSTRUCTORS
    =============================== */

    public User() {}

    /* ===============================
       GETTERS & SETTERS
    =============================== */

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Needed for BCrypt + validation
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGoal() {
        return goal;
    }
    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Double getHeight() {
        return height;
    }
    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }
    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getBmi() {
        return bmi;
    }
    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }
}



