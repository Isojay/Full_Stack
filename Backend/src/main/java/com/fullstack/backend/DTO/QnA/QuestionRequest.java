package com.fullstack.backend.DTO.QnA;

import lombok.Data;


@Data

public class QuestionRequest {

    private String title;

    private String userEmail;

    private String question;

}
