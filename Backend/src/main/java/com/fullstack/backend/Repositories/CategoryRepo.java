package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {

}
