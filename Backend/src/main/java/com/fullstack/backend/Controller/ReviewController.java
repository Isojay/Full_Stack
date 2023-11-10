package com.fullstack.backend.Controller;

import com.fullstack.backend.DTO.ReviewRequest;
import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Services.ReviewService;
import com.fullstack.backend.Utils.JwtExtraction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
@RequestMapping("/api/reviews")
@CrossOrigin("http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtExtraction jwtExtraction;

    @GetMapping("/{bid}")
    public Page<Review> returnReview(@PathVariable Long bid,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "3") int size)
    {
        Pageable pageable = PageRequest.of(page, size);
        return reviewService.findById(bid, pageable);
    }

    @PostMapping("/secure/addUserReview")
    public String addUserReview(@RequestHeader("Authorization") String token, @RequestBody ReviewRequest review) {
        review.setUserEmail(jwtExtraction.extractSubject(token));
        try {
            reviewService.saveReview(review);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping("/secure/userReviewStatus")
    public boolean checkUserReviewStatus(@RequestHeader("Authorization") String token,
                                         @RequestParam Long bookId)
    {
        return reviewService
                .checkUserReviewStatus(jwtExtraction.extractSubject(token),bookId);

    }

}
