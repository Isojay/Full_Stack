package com.fullstack.backend.Services;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Repositories.BookRepo;
import lombok.RequiredArgsConstructor;
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


}
