package com.fullstack.backend.Controller;

import com.fullstack.backend.Reponse.Loans;
import com.fullstack.backend.Services.LoanService;
import com.fullstack.backend.Utils.JwtExtraction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/loans")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:5173")
public class LoanController {

    private final LoanService loanService;
    private final JwtExtraction jwtExtraction;

    @GetMapping
    public List<Loans> getLoanBooks(@RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmail(token);
        return loanService.returnLoanBooks(userEmail);
    }

    @PutMapping("/return/{id}")
    public void returnBook(@RequestHeader("Authorization")String token,@PathVariable long id ){
        String userEmail = extractUserEmail(token);
        try{
            loanService.returnBook(userEmail,id);

        }catch (Exception e){
            log.error(e.getMessage());
        }
    }
    @PutMapping("/extend/{id}")
    public void extendReturnDate(@RequestHeader("Authorization")String token,@PathVariable long id ){
        String userEmail = extractUserEmail(token);
        loanService.extendBookDuration(userEmail,id);
    }

    private String extractUserEmail(String token) {
        log.info( jwtExtraction.extractSubject(token));
        return jwtExtraction.extractSubject(token);

    }


}
