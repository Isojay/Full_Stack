package com.fullstack.backend.Controller;

import com.fullstack.backend.Reponse.Loans;
import com.fullstack.backend.Services.HistoryService;
import com.fullstack.backend.Services.LoanService;
import com.fullstack.backend.Utils.JwtExtraction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/loans")
@RequiredArgsConstructor
@Slf4j
public class LoanController {

    private final LoanService loanService;
    private final HistoryService historyService;
    private final JwtExtraction jwtExtraction;


    @GetMapping
    public List<Loans> getLoanBooks(@RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmail(token);
        return loanService.returnLoanBooks(userEmail);
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<Void> returnBook(@RequestHeader("Authorization")String token,@PathVariable long id ){
        String userEmail = extractUserEmail(token);
        try{
            historyService.addToHistory(userEmail,id);
            loanService.returnBook(userEmail,id);
            return ResponseEntity.ok().build();

        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/extend/{id}")
    public ResponseEntity<Void> extendReturnDate(@RequestHeader("Authorization")String token,@PathVariable long id ){
        String userEmail = extractUserEmail(token);
        try{
            loanService.extendBookDuration(userEmail,id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    private String extractUserEmail(String token) {
        String userEmail = jwtExtraction.extractSubject(token);
        log.info(userEmail);
        return userEmail;
    }
}