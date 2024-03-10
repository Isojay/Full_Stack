package com.fullstack.backend.Services.Book.Service;

import com.fullstack.backend.DTO.BookRequest;
import com.fullstack.backend.Exceptions.NoDataFoundException;
import com.fullstack.backend.Services.Book.Model.Book;
import com.fullstack.backend.Services.Book.Model.Category;
import com.fullstack.backend.Services.Book.Repo.BookRepo;
import com.fullstack.backend.Services.Book.Repo.CategoryRepo;
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
                .orElseThrow(() -> new NoDataFoundException("Category Not Found. Try Again"));

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
