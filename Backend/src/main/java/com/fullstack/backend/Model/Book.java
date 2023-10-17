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
    private long bid;

    private String bname;

    private String bauthor;

    private String description;

    private  int copies;

    private  int available;

    private String Categories;

    private String imgName;


}
