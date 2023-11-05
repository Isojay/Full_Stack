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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:5173")
public class BookController {

    private final BookService bookService;
    private final CategoryRepo repo;

    @GetMapping("/category")
    public Page<Category> findCategory(){
        Pageable pageable = PageRequest.of(0,100, Sort.by("cname").ascending());
        return repo.findAll(pageable);
    }

    @GetMapping("/bookById/{id}")
    public Optional<Book> findById(@PathVariable long id){
        return bookService.findById(id);

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
            return bookService.findByKeywordWithAuthor(keyword,keyword, pageable);
        }
        return bookService.findCategoryIDPageSize(id, pageable);
    }

    @PutMapping("/secure/checkout")
    public ResponseEntity<?> getByEmailAndId(@RequestParam long id) {
        String email = "test@gmail.com";
        try {
            Book book = bookService.bookCheckout(email, id);
            return ResponseEntity.ok(book); // Return the book object as a success response
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An error occurred: " + errorMessage); // Return an error message as an error response
        }
    }
    @GetMapping("/secure/checkout/byUser")
    public  boolean checkUserCart(@RequestParam long id){
        String email = "test@gmail.com";
        return bookService.userCart(email,id);
    }

    @GetMapping("/secure/checkout")
    public int userCartSize(){
        String email = "test@gmail.com";
        return bookService.userCartSize(email);

    }

}





