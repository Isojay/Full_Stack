package com.fullstack.backend.DTO;

import com.fullstack.backend.Model.Book.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseMapper {

    private Book book;

    private String message;

    public ResponseMapper(Book book) {
        this.book =book;
    }

    public ResponseMapper(String message) {
        this.message = message;
    }
}
