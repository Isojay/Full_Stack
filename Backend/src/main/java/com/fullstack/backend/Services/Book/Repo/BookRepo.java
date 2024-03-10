package com.fullstack.backend.Services.Book.Repo;

import com.fullstack.backend.Services.Book.Model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;


public interface BookRepo extends JpaRepository<Book, Long> {

    Page<Book> findBookByCategory_Id(long id, Pageable pageable);

    Page<Book> findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.date < :date")
    Page<Book> findNewArrivalsBeforeDate(@Param("date") LocalDate date, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.title = :title")
    Book findByTitle(@Param("title") String title);


}
