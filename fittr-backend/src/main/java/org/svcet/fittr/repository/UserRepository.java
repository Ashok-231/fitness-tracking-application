package org.svcet.fittr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.svcet.fittr.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    /* ===============================
       🔐 AUTHENTICATION
    =============================== */

    Optional<User> findByEmail(String email);

    /* ===============================
       🛡️ ADMIN STATS
    =============================== */

    long countByRole(String role);

    /* ===============================
       👥 ADMIN USER LIST (SEARCH + DELETE)
       NOW RETURNS ROLE ALSO
    =============================== */

    @Query("SELECT u.id, u.name, u.role FROM User u")
    List<Object[]> findAllUsersWithRole();

    /* ===============================
       👤 OPTIONAL NAME-ONLY QUERIES
    =============================== */

    @Query("SELECT u.name FROM User u")
    List<String> findAllUserNames();

    @Query("SELECT u.name FROM User u WHERE u.role = 'ROLE_USER'")
    List<String> findNormalUserNames();

    @Query("SELECT u.name FROM User u WHERE u.role = 'ROLE_ADMIN'")
    List<String> findAdminNames();

    /* ===============================
       📊 EXTRA
    =============================== */

    boolean existsByEmail(String email);
}