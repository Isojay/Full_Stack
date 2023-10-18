package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepo extends JpaRepository<Book, Long> {

    public List<Book> findBookByCategory_Id(long id);


}
