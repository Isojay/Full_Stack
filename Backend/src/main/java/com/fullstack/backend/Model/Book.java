package com.fullstack.backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String author;

    private String description;

    private int copies;

    private int available;

    private String imgName;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    private Category category;


}
