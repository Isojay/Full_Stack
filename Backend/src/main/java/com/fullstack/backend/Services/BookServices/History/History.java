package com.fullstack.backend.Services.BookServices.History;


import com.fullstack.backend.Services.Book.Model.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Book book;

    private String userEmail;

    private LocalDate returnedDate;

    private LocalDate checkoutDate;

    private boolean deletedHistory;

}
