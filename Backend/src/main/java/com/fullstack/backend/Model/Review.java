package com.fullstack.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userEmail;
    private String userName;
    private Date date;
    private double rating;
    private String reviewDescription;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

}
