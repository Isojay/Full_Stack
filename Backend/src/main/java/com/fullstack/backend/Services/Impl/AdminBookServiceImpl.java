package com.fullstack.backend.Services.Impl;

import com.fullstack.backend.DTO.BookRequest;
import com.fullstack.backend.Model.Book.Book;
import com.fullstack.backend.Model.Book.Category;
import com.fullstack.backend.Repositories.BookRepo.BookRepo;
import com.fullstack.backend.Repositories.BookRepo.CategoryRepo;
import com.fullstack.backend.ServiceClass.AdminBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@RequiredArgsConstructor
@Slf4j
@Component
public class AdminBookServiceImpl implements AdminBookService {

    private final BookRepo bookRepo;
    private final CategoryRepo categoryRepo;


    @Override
    public String addBook(BookRequest bookRequest) {

        Category category = categoryRepo.findById(bookRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category Not Found. Try Again"));

        Book book = Book
                .builder()
                .author(bookRequest.getAuthor())
                .title(bookRequest.getTitle())
                .description(bookRequest.getDescription())
                .available(bookRequest.getCopies())
                .copies(bookRequest.getCopies())
                .imgName(bookRequest.getImgName())
                .date(LocalDate.now())
                .category(category)
                .build();

        bookRepo.save(book);



        return null;
    }
}
