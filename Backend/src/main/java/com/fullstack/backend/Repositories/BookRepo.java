package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepo extends JpaRepository<Book, Long> {

    public List<Book> findBookByCategory_Id(long id);



    Page<Book> findBookByCategory_Id(long id, Pageable pageable);

    Page<Book> findBookByTitleIsContainingIgnoreCase(String title, Pageable pageable);

    Page<Book> findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title,String author, Pageable pageable);






}
