package com.fullstack.backend.Model.QnA;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "QnAQuestion")
public class QnAQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "question")
    private String question;

    @Column(name = "asked_date")
    private LocalDate askedDate;

    @Column(name = "closed")
    private boolean closed;


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "response_id", referencedColumnName = "id")
    private QnAResponse response;

}