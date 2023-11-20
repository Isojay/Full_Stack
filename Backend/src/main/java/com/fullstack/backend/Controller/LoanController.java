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
    public List<Loans> getBookList(@RequestHeader("Authorization")String token){
        String userEmail =jwtExtraction.extractSubject(token);;

        return loanService.returnLoanBooks(userEmail);

    }

}
