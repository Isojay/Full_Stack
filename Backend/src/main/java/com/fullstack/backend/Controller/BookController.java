package com.fullstack.backend.Controller;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> findAll(){
        return bookService.findAll();
    }

}
