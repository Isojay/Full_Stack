package com.fullstack.backend.Services;


import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Repositories.ReviewRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepo reviewRepo;

    public Page<Review> findById(Long bookID, Pageable pageable){
        return reviewRepo.findByBookId(bookID,pageable);
    }

    public void saveReview(Review review){
        review.setDate(new Date());
        reviewRepo.save(review);
    }


}
