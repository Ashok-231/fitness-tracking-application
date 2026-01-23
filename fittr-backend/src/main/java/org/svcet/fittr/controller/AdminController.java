package org.svcet.fittr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.repository.UserRepository;
import org.svcet.fittr.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    /* ===============================
       📊 ADMIN DASHBOARD STATS
    =============================== */

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        return adminService.getDashboardStats();
    }

    /* ===============================
       👥 ADMIN USER LIST (SEARCH)
    =============================== */

    // ✅ Used by AdminDashboard.jsx (search + delete)
    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        return userRepository.findAllUserIdAndNames()
                .stream()
                .map(row -> {
                    Map<String, Object> user = new HashMap<>();
                    user.put("id", row[0]);
                    user.put("name", row[1]);
                    return user;
                })
                .collect(Collectors.toList());
    }

    /* ===============================
       ❌ DELETE USER
    =============================== */

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    /* ===============================
       🧾 OPTIONAL NAME-ONLY APIs
       (Keep ONLY if used elsewhere)
    =============================== */

    @GetMapping("/users/names")
    public List<String> getAllUserNames() {
        return userRepository.findAllUserNames();
    }

    @GetMapping("/users/names/normal")
    public List<String> getNormalUserNames() {
        return userRepository.findNormalUserNames();
    }

    @GetMapping("/users/names/admin")
    public List<String> getAdminNames() {
        return userRepository.findAdminNames();
    }
}

