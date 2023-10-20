package com.fullstack.backend.Controller;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Model.Category;
import com.fullstack.backend.Repositories.CategoryRepo;
import com.fullstack.backend.Services.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:5173")
public class BookController {

    private final BookService bookService;
    private final CategoryRepo repo;

//    @GetMapping
//    public List<Book> findAll(){
//        return bookService.findAll();
//    }

    @GetMapping("/category")
    public Page<Category> findCategory(){
        Pageable pageable = PageRequest.of(0,100, Sort.by("cname").ascending());
        return repo.findAll(pageable);
    }

    @GetMapping
    public Page<Book> findCID(
            @RequestParam(required = false) Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());
        if (id == null && keyword == null) {
            return bookService.findByPageSize(pageable);
        }
        if (keyword != null) {
            log.info(keyword); // Log the keyword instead
            return bookService.findByKeywordWithAuthor(keyword,keyword, pageable);
        }
        return bookService.findCategoryIDPageSize(id, pageable);
    }




}
