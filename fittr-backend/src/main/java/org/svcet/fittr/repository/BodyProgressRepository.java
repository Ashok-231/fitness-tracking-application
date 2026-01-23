package org.svcet.fittr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.BodyProgress;

public interface BodyProgressRepository extends JpaRepository<BodyProgress, Long> {
    List<BodyProgress> findByUserIdOrderByDateAsc(Long userId);
}
