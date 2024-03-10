package com.fullstack.backend.Services.BookServices.Loan;

import com.fullstack.backend.Services.Book.Model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Loans {

    private Book book;

    private Long daysLeft;

}
