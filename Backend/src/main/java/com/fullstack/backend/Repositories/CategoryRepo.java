package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {


    Page<Category> findAll(Pageable pageable);
}
