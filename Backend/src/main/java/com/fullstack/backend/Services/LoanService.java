package com.fullstack.backend.Services;


import com.fullstack.backend.Model.Book;
import com.fullstack.backend.Model.CheckOut;
import com.fullstack.backend.Reponse.Loans;
import com.fullstack.backend.Repositories.BookRepo;
import com.fullstack.backend.Repositories.CheckOutRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanService {

    private final BookRepo bookRepo;
    private final CheckOutRepo checkOutRepo;


    public List<Loans> returnLoanBooks(String userEmail) {

        List<Loans> loans = new ArrayList<>();
        List<Long> bookIdList = new ArrayList<>();

        List<CheckOut> checkOutList = checkOutRepo.findByUserEmailIgnoreCase(userEmail);

        for (CheckOut i : checkOutList) {
            bookIdList.add(i.getBookId());
        }

        List<Book> books = bookRepo.findAllById(bookIdList);

        for (Book book : books) {
            Optional<CheckOut> checkOut = checkOutList
                    .stream()
                    .filter(
                            x -> x.getBookId() == book.getId())
                    .findFirst();

            if (checkOut.isPresent()) {
                LocalDate currentDate = LocalDate.now();
                LocalDate borrowDate = checkOut.get().getCheckoutDate();

                long daysLeft = ChronoUnit.DAYS.between( borrowDate, currentDate);

                loans.add(new Loans(book,daysLeft));

                log.info(String.valueOf(daysLeft));
            }
        }

        return loans;

    }

}
