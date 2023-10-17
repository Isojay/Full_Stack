package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Long> {
}
