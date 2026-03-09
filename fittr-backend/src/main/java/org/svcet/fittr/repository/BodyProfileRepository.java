package org.svcet.fittr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.BodyProfile;

public interface BodyProfileRepository extends JpaRepository<BodyProfile, Long> {

    Optional<BodyProfile> findByUserId(Long userId);

}
