package com.fullstack.backend.Repositories.BookRepo;

import com.fullstack.backend.Model.Book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepo extends JpaRepository<Book, Long> {

    Page<Book> findBookByCategory_Id(long id, Pageable pageable);

    Page<Book> findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author, Pageable pageable);


}
