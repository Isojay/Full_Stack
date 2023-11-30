package com.fullstack.backend.Repositories.QnARepo;

import com.fullstack.backend.Model.QnA.QnAQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QnAQuestionRepo extends JpaRepository<QnAQuestion,Long> {

    List<QnAQuestion> findAllByClosed(Boolean check);


}
