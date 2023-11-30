package com.fullstack.backend.Controller;

import com.fullstack.backend.DTO.QnA.QuestionRequest;
import com.fullstack.backend.DTO.QnA.ResponseRequest;
import com.fullstack.backend.Services.QnAService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/QnA")
@RequiredArgsConstructor
@Slf4j
public class QnAController {

    private final QnAService service;

    @PostMapping
    public String SaveQuestion(@RequestBody QuestionRequest request){
        try{
            service.postQuestion(request);
            return "Success";
        }catch (Exception e){
            log.error(e.getMessage());
            return e.getMessage();
        }
    }

    @PutMapping
    public String SaveResponse(@RequestBody ResponseRequest request){
        try{
            service.postReply(request);
            return "Success";
        }catch (Exception e){
            log.error(e.getMessage());
            return e.getMessage();
        }
    }

}
