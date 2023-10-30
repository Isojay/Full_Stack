package com.fullstack.backend.Controller;

import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public Page<Review> returnReview( @RequestParam(required = false) Long bid,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "3") int size
                                     ){
        Pageable pageable = PageRequest.of(page, size);
        return reviewService.findById(bid,pageable);
    }

}
