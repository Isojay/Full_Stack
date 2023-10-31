package com.fullstack.backend.Controller;

import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Services.ReviewService;
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

    @GetMapping("/{bid}")
    public Page<Review> returnReview( @PathVariable Long bid,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "3") int size
                                     ){
        Pageable pageable = PageRequest.of(page, size);
        return reviewService.findById(bid,pageable);
    }

//    @PostMapping
//    public String addReview(@RequestBody Review review){
//        try{
//            reviewService.saveReview(review);
//            return "Success";
//        }catch (Exception e){
//            return e.getMessage();
//        }
//
//    }

}
