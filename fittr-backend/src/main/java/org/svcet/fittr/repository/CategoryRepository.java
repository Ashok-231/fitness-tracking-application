package org.svcet.fittr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.svcet.fittr.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
}

