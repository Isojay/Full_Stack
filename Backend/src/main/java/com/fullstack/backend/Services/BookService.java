package com.fullstack.backend.Services;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Repositories.BookRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;

    public Optional<Book> findById(long id){
        return  bookRepo.findById(id);
    }


    public Page<Book> findCategoryIDPageSize(long id, Pageable pageable){
        return  bookRepo.findBookByCategory_Id(id,pageable);
    }

    public Page<Book> findByPageSize( Pageable pageable){
        return  bookRepo.findAll(pageable);
    }

    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable){
        return bookRepo.findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(title, title ,pageable);
    }


}
