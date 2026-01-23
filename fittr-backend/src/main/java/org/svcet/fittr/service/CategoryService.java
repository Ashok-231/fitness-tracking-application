package org.svcet.fittr.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.svcet.fittr.entity.Category;
import org.svcet.fittr.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public Category save(Category category) {
        return repo.save(category);
    }

    public List<Category> getAll() {
        return repo.findAll();
    }
}


