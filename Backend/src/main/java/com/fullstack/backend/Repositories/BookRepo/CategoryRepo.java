package com.fullstack.backend.Repositories.BookRepo;

import com.fullstack.backend.Model.Book.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {

}
