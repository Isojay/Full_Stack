package com.fullstack.backend.Controller;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Model.Category;
import com.fullstack.backend.Repositories.CategoryRepo;
import com.fullstack.backend.Services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class BookController {

    private final BookService bookService;
    private final CategoryRepo repo;

//    @GetMapping
//    public List<Book> findAll(){
//        return bookService.findAll();
//    }

    @GetMapping("/category")
    public List<Category> findCategory(){
        return repo.findAll();
    }

    @GetMapping
    public Page<Book> findCID(
            @RequestParam(required = false) Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ){
        Pageable pageable = PageRequest.of(page,size);
        if (id == null){
            return bookService.findByPageSize(pageable);
        }
        return bookService.findCategoryIDPageSize(id,pageable);
    }



}
