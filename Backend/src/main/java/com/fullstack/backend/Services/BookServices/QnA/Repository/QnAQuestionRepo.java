package com.fullstack.backend.Services.BookServices.QnA.Repository;

import com.fullstack.backend.Services.BookServices.QnA.Model.QnAQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QnAQuestionRepo extends JpaRepository<QnAQuestion, Long> {

    List<QnAQuestion> findAllByClosed(Boolean check);


}
