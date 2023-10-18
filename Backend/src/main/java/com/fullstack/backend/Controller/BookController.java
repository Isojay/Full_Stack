package com.fullstack.backend.Controller;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/byCategory")
    public List<Book> findByCategory(@RequestParam long id){
        return bookService.findByCategoryId(id);
    }

}
