package com.fullstack.backend.Services.BookServices.Review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long> {

    Page<Review> findByBookId(long id, Pageable pageable);

    Review findByUserEmailContainingIgnoreCaseAndBookId(String email, Long id);


}
