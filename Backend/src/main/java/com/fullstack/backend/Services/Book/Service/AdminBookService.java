package com.fullstack.backend.Services.Book.Service;

import com.fullstack.backend.DTO.BookRequest;
import org.springframework.stereotype.Service;

@Service
public interface AdminBookService {

    public String addBook(BookRequest book);

}
