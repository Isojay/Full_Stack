package com.fullstack.backend.ServiceClass;

import com.fullstack.backend.DTO.BookRequest;
import com.fullstack.backend.Model.Book.Book;
import org.springframework.stereotype.Service;

@Service
public interface AdminBookService {

    public String addBook(BookRequest book);

}
