package com.fullstack.backend.DTO.QnA;

import lombok.Data;

@Data
public class ResponseRequest {

    public long id;

    private String adminEmail;

    private String response;


}
