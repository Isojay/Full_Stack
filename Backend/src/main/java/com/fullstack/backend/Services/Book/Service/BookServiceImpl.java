package com.fullstack.backend.Services.Book.Service;

import com.fullstack.backend.Exceptions.NoDataFoundException;
import com.fullstack.backend.Services.Book.Model.Book;
import com.fullstack.backend.Services.Book.Repo.BookRepo;
import com.fullstack.backend.Services.BookServices.Checkout.CheckOut;
import com.fullstack.backend.Services.BookServices.Checkout.CheckOutRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookRepo bookRepo;
    private final CheckOutRepo checkOutRepo;

    @Override
    public Book findById(long id) {
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new NoDataFoundException("Book Not Found."));
        ;
        return book;
    }

    @Override
    public Page<Book> findBookByCategory(long id, Pageable pageable) {
        return bookRepo.findBookByCategory_Id(id, pageable);
    }

    @Override
    public Page<Book> findByPageSize(Pageable pageable) {
        return bookRepo.findAll(pageable);
    }

    @Override
    public Page<Book> findByKeywordWithAuthor(String title, String author, Pageable pageable) {
        return bookRepo.findBookByTitleIsContainingIgnoreCaseOrAuthorContainingIgnoreCase(title, title, pageable);
    }

    @Override
    public Book bookCheckout(String email, Long bookId) throws Exception {
        Optional<Book> bookOptional = bookRepo.findById(bookId);
        log.info(String.valueOf(bookOptional));
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

    @Override
    public Boolean userCart(String email, Long bookId) {
        CheckOut validate = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(email, bookId);
        return validate != null;
    }

    @Override
    public int userCartSize(String email) {
        return checkOutRepo.findByUserEmailIgnoreCase(email).size();
    }

    @Override
    public Page<Book> newArrivals(int page, int size) {
        LocalDate currentDate = LocalDate.now().minusMonths(1);
        Pageable pageable = PageRequest.of(page, size);
        return bookRepo.findNewArrivalsBeforeDate(currentDate, pageable);
    }
}