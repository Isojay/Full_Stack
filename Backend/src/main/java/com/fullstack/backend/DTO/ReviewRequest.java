package com.fullstack.backend.DTO;


import lombok.Data;

@Data
public class ReviewRequest {

    private double rating;

    private long bookId;

    private String reviewDescription;

    private String userEmail;


}
