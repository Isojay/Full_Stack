package com.fullstack.backend.Reponse;

import com.fullstack.backend.Model.Book.Book;
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
