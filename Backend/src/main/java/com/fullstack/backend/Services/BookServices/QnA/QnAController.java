package com.fullstack.backend.Services.BookServices.QnA;

import com.fullstack.backend.DTO.QnA.QuestionRequest;
import com.fullstack.backend.DTO.QnA.ResponseRequest;
import com.fullstack.backend.Utils.JwtExtraction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/QnA")
@RequiredArgsConstructor
@Slf4j
public class QnAController {

    private final QnAService service;
    private final JwtExtraction jwtExtraction;

    @PostMapping("/secure/saveQuestion")
    public ResponseEntity<String> SaveQuestion(@RequestHeader("Authorization") String token,
                                               @RequestBody QuestionRequest request) {
        try {
            request.setUserEmail(jwtExtraction.extractSubject(token));
            service.postQuestion(request);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/secure/saveResponse")
    public ResponseEntity<String> SaveResponse(@RequestHeader("Authorization") String token,
                                               @RequestBody ResponseRequest request) {
        try {
            request.setAdminEmail(jwtExtraction.extractSubject(token));
            service.postReply(request);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}