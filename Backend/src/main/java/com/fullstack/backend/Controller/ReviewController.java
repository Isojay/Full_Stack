package com.fullstack.backend.Controller;

import com.fullstack.backend.DTO.ReviewRequest;
import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Services.BookServices.ReviewService;
import com.fullstack.backend.Utils.JwtExtraction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtExtraction jwtExtraction;

    @GetMapping("/{bid}")
    public Page<Review> returnReview(@PathVariable Long bid,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "3") int size) {
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
            log.info(e.getMessage());
            return "Error";
        }
    }

    @GetMapping("/secure/userReviewStatus")
    public boolean checkUserReviewStatus(@RequestHeader("Authorization") String token,
                                         @RequestParam Long bookId) {
        return reviewService
                .checkUserReviewStatus(jwtExtraction.extractSubject(token), bookId);

    }

    @DeleteMapping("/secure/deleteReview/{id}")
    public String deleteReview(@PathVariable int id) {
        if (reviewService.deleteReview(id)) {
            return "Success";
        }
        return "Error";
    }

}
