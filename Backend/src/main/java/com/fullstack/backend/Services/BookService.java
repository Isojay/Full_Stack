package com.fullstack.backend.Services;


import com.fullstack.backend.Repositories.BookRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;


}
