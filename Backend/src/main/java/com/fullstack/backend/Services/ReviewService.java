package com.fullstack.backend.Services;


import com.fullstack.backend.DTO.ReviewRequest;
import com.fullstack.backend.Model.Book.Book;
import com.fullstack.backend.Model.Review;
import com.fullstack.backend.Repositories.BookRepo.BookRepo;
import com.fullstack.backend.Repositories.ReviewRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final BookRepo bookRepo;

    public Page<Review> findById(Long bookID, Pageable pageable) {
        return reviewRepo.findByBookId(bookID, pageable);
    }

    public void saveReview(ReviewRequest reviewRequest) throws Exception {

        Review validateReview = reviewRepo.findByUserEmailContainingIgnoreCaseAndBookId(reviewRequest.getUserEmail(), reviewRequest.getBookId());

        if (validateReview != null) {
            throw new Exception("Review is Already Created");
        }

        Optional<Book> book = bookRepo.findById(reviewRequest.getBookId());

        if (book.isPresent()) {
            Review review = Review.builder()
                    .book(book.get())
                    .date(new Date())
                    .reviewDescription(reviewRequest.getReviewDescription())
                    .rating(reviewRequest.getRating())
                    .userEmail(reviewRequest.getUserEmail())
                    .build();

            reviewRepo.save(review);
        } else {
            throw new Exception("Book Id not valid");
        }
    }

    public Boolean checkUserReviewStatus(String email, Long bookId) {

        Review validateReview = reviewRepo.findByUserEmailContainingIgnoreCaseAndBookId(email, bookId);

        return !(validateReview == null);
    }


}
