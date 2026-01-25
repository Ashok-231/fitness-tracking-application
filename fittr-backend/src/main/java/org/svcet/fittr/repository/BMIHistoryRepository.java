package org.svcet.fittr.repository;

import org.svcet.fittr.entity.BMIHistory;
import org.svcet.fittr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BMIHistoryRepository extends JpaRepository<BMIHistory, Long> {
    List<BMIHistory> findByUserOrderByDateAsc(User user);
}
