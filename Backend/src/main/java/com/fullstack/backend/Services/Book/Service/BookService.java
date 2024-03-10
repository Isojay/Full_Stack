package com.fullstack.backend.Services.Book.Service;

import com.fullstack.backend.Services.Book.Model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface BookService {

    public Book findById(long id);

    public Page<Book> findBookByCategory(long id, Pageable pageable);

    public Page<Book> findByPageSize(Pageable pageable);

    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable);

    public Book bookCheckout(String email, Long bookId) throws Exception;

    public Boolean userCart(String email, Long bookId);

    public int userCartSize(String email);

    public Page<Book> newArrivals(int page, int size);

}
