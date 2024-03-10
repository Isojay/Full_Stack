package com.fullstack.backend.Services.Book.Repo;

import com.fullstack.backend.Services.Book.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {

}
