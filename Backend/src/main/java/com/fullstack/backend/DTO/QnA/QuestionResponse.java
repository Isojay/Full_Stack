package com.fullstack.backend.DTO.QnA;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@Data
@Builder
public class QuestionResponse {

    private long id;

    private String title;

    private String userEmail;

    private String question;

    private LocalDate askedDate;

    private boolean closed;

    private String adminEmail;

    private String response;

    private LocalDate responseDate;


}
