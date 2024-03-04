package com.fullstack.backend.ServiceClass;

import com.fullstack.backend.Model.Book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface BookService {

    public Optional<Book> findById(long id);

    public Page<Book> findBookByCategory(long id, Pageable pageable);

    public Page<Book> findByPageSize(Pageable pageable);

    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable);

    public Book bookCheckout(String email, Long bookId) throws Exception;

    public Boolean userCart(String email, Long bookId);

    public int userCartSize(String email);

    public Page<Book> newArrivals(int page, int size);

}
