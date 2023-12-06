package com.fullstack.backend.Services.BookServices;


import com.fullstack.backend.DTO.QnA.QuestionRequest;
import com.fullstack.backend.DTO.QnA.QuestionResponse;
import com.fullstack.backend.DTO.QnA.ResponseRequest;
import com.fullstack.backend.Exceptions.NoDataFoundException;
import com.fullstack.backend.Model.QnA.QnAQuestion;
import com.fullstack.backend.Model.QnA.QnAResponse;
import com.fullstack.backend.Repositories.QnARepo.QnAQuestionRepo;
import com.fullstack.backend.Repositories.QnARepo.QnAResponseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QnAService {

    private final QnAQuestionRepo questionRepo;
    private final QnAResponseRepo responseRepo;

    public List<QuestionResponse> findAll(Boolean check) {
        List<QnAQuestion> questions = check != null ? questionRepo.findAllByClosed(check) : questionRepo.findAll();

        if (questions.isEmpty()) {
            throw new NoDataFoundException("No questions found");
        }

        return questions.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public void postQuestion(QuestionRequest request){

        QnAQuestion question = QnAQuestion
                .builder()
                .title(request.getTitle())
                .userEmail(request.getUserEmail())
                .question(request.getQuestion())
                .askedDate(LocalDate.now())
                .closed(false)
                .response(null)
                .build();

        questionRepo.save(question);

    }

    public void postReply(ResponseRequest request){

        Optional<QnAQuestion> question = questionRepo.findById(request.getId());
        if(question.isPresent()) {
            QnAResponse response = QnAResponse
                    .builder()
                    .response(request.getResponse())
                    .adminEmail(request.getAdminEmail())
                    .responseDate(LocalDate.now())
                    .build();

            question.get().setResponse(response);

            questionRepo.save(question.get());
        }else{
            throw new NoDataFoundException("No questions found");
        }


    }

    public QuestionResponse mapToResponse(QnAQuestion question) {
        if (question.getResponse() != null) {
            return QuestionResponse.builder()
                    .id(question.getId())
                    .title(question.getTitle())
                    .question(question.getQuestion())
                    .askedDate(question.getAskedDate())
                    .userEmail(question.getUserEmail())
                    .response(question.getResponse().getResponse())
                    .responseDate(question.getResponse().getResponseDate())
                    .adminEmail(question.getResponse().getAdminEmail())
                    .closed(question.isClosed())
                    .build();
        } else {
            // Handle the case where the question has no response
            return QuestionResponse.builder()
                    .id(question.getId())
                    .title(question.getTitle())
                    .question(question.getQuestion())
                    .askedDate(question.getAskedDate())
                    .userEmail(question.getUserEmail())
                    .closed(question.isClosed())
                    .build();
        }
    }

}
