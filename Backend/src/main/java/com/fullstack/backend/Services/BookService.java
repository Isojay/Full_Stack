package com.fullstack.backend.Services;

import com.fullstack.backend.Model.Book.Book;
import com.fullstack.backend.Model.CheckOut;
import com.fullstack.backend.Repositories.BookRepo.BookRepo;
import com.fullstack.backend.Repositories.CheckOutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;
    private final CheckOutRepo checkOutRepo;

    public Optional<Book> findById(long id) {
        return bookRepo.findById(id);
    }

    public Page<Book> findBookByCategory(long id, Pageable pageable) {
        return bookRepo.findBookByCategory_Id(id, pageable);
    }

    public Page<Book> findByPageSize(Pageable pageable) {
        return bookRepo.findAll(pageable);
    }

    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable) {
        return bookRepo.findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(title, title, pageable);
    }

    public Book bookCheckout(String email, Long bookId) throws Exception {
        Optional<Book> bookOptional = bookRepo.findById(bookId);
        if (bookOptional.isEmpty()) {
            throw new Exception("Book doesn't exist");
        }

        Book book = bookOptional.get();
        if (book.getAvailable() <= 0) {
            throw new Exception("Book is not available");
        }

        CheckOut validate = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(email, bookId);
        if (validate != null) {
            throw new Exception("Book already checked out by user");
        }

        book.setAvailable(book.getAvailable() - 1);
        bookRepo.save(book);

        CheckOut checkOut = CheckOut.builder()
                .userEmail(email)
                .returnDate(LocalDate.now().plusDays(7))
                .checkoutDate(LocalDate.now())
                .bookId(book.getId())
                .build();

        checkOutRepo.save(checkOut);
        return book;
    }

    public Boolean userCart(String email, Long bookId) {
        CheckOut validate = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(email, bookId);
        return validate != null;
    }

    public int userCartSize(String email) {
        return checkOutRepo.findByUserEmailIgnoreCase(email).size();
    }
}