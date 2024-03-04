package com.fullstack.backend.Model.QnA;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "QnAResponse")
public class QnAResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Replied BY
    private String adminEmail;

    //Answer
    private String response;

    private LocalDate responseDate;


}
