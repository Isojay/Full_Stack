package com.fullstack.backend.Services.BookServices;


import com.fullstack.backend.Model.Book.Book;
import com.fullstack.backend.Model.CheckOut;
import com.fullstack.backend.Reponse.Loans;
import com.fullstack.backend.Repositories.BookRepo.BookRepo;
import com.fullstack.backend.Repositories.CheckOutRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanService {

    private final BookRepo bookRepo;
    private final CheckOutRepo checkOutRepo;


    public List<Loans> returnLoanBooks(String userEmail) {
        List<CheckOut> checkOutList = checkOutRepo.findByUserEmailIgnoreCase(userEmail);

        // Mapping CheckOuts by bookId for efficient searching
        Map<Long, CheckOut> checkOutByBookId = checkOutList.stream()
                .collect(Collectors.toMap(CheckOut::getBookId, Function.identity()));

        // Fetching only the books matching the bookIds in the checkOuts
        List<Book> books = bookRepo.findAllById(checkOutByBookId.keySet());

        // Calculate loans for each book
        return books.stream()
                .filter(book -> checkOutByBookId.containsKey(book.getId()))
                .map(book -> {
                    LocalDate currentDate = LocalDate.now();
                    LocalDate borrowDate = checkOutByBookId.get(book.getId()).getReturnDate();
                    long daysLeft = ChronoUnit.DAYS.between(currentDate, borrowDate);
                    log.info(String.valueOf(daysLeft));
                    return new Loans(book, daysLeft);
                }).collect(Collectors.toList());
    }

    public void returnBook(String email, long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchElementException("Book for the Respective Id not found"));

        CheckOut checkOut = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(email, bookId);
        if (checkOut == null) {
            throw new NoSuchElementException("No checked out book found for the given user email and bookId");
        }

        checkOutRepo.deleteById(checkOut.getId());
        book.setAvailable(book.getAvailable() + 1);
        bookRepo.save(book);
    }

    public void extendBookDuration(String email, long bookId) {
        CheckOut checkOut = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(email, bookId);

        if (checkOut == null) {
            throw new NoSuchElementException("No checked out book found for the given user email and bookId");
        }

        long extendedPeriod = 7L - ChronoUnit.DAYS.between(LocalDate.now(), checkOut.getReturnDate());
        checkOut.setReturnDate(checkOut.getReturnDate().plusDays(extendedPeriod));
        checkOutRepo.save(checkOut);
    }

}
