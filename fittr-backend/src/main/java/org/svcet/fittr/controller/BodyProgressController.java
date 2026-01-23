package org.svcet.fittr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svcet.fittr.entity.BodyProgress;
import org.svcet.fittr.repository.BodyProgressRepository;

@RestController
@RequestMapping("/api/body-progress")
@CrossOrigin(origins = "http://localhost:3000")
public class BodyProgressController {

    private final BodyProgressRepository repo;

    public BodyProgressController(BodyProgressRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{userId}")
    public List<BodyProgress> getHistory(@PathVariable Long userId) {
        return repo.findByUserIdOrderByDateAsc(userId);
    }
}
