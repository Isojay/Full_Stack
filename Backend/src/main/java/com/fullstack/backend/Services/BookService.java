package com.fullstack.backend.Services;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Repositories.BookRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;

    public List<Book> findAll(){
        return  bookRepo.findAll();
    }

    public List<Book> findByCategoryId(long id){
        return bookRepo.findBookByCategory_Id(id);
    }

    public Page<Book> findCategoryIDPageSize(long id, Pageable pageable){
        return  bookRepo.findBookByCategory_Id(id,pageable);
    }

    public Page<Book> findByPageSize( Pageable pageable){
        return  bookRepo.findAll(pageable);
    }

    public Page<Book> findByKeyword(String title, Pageable pageable){
        return bookRepo.findBookByTitleIsContainingIgnoreCase(title ,pageable);
    }

    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable){
        return bookRepo.findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(title, title ,pageable);
    }


}
