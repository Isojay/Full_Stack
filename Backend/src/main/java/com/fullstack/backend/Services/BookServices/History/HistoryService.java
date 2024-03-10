package com.fullstack.backend.Services.BookServices.History;


import com.fullstack.backend.Services.Book.Model.Book;
import com.fullstack.backend.Services.Book.Repo.BookRepo;
import com.fullstack.backend.Services.BookServices.Checkout.CheckOut;
import com.fullstack.backend.Services.BookServices.Checkout.CheckOutRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryService {

    private final HistoryRepo historyRepo;
    private final BookRepo bookRepo;
    private final CheckOutRepo checkOutRepo;

    public Page<History> findByEmail(String userEmail, Pageable pageable) {
        return historyRepo.findByUserEmailIgnoreCase(userEmail, pageable);
    }

    public void addToHistory(String userEmail, long bookId) {

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchElementException("Book for the Respective Id not found"));

        CheckOut checkOut = checkOutRepo.findByUserEmailIgnoreCaseAndBookId(userEmail, bookId);
        if (checkOut == null) {
            throw new NoSuchElementException("No checked out book found for the given user email and bookId");
        }

        History history = History
                .builder()
                .book(book)
                .checkoutDate(checkOut.getCheckoutDate())
                .returnedDate(LocalDate.now())
                .userEmail(userEmail)
                .deletedHistory(false)
                .build();

        historyRepo.save(history);
    }

    public void deleteHistoryUser(Long id, String userEmail) {
        log.info("email : {}", userEmail);
        log.info("id : {}", id);
        log.info("we are here");
        if (id == null && userEmail == null) {
            throw new IllegalArgumentException("Both id and userEmail cannot be null.");
        }

        if (id == null) {
            try {
                historyRepo.deleteAllByUserEmailIgnoreCase(userEmail);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
            return;
        }
        historyRepo.deleteById(id);
    }

}
