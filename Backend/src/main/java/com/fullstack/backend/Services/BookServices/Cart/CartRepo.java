package com.fullstack.backend.Services.BookServices.Cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, Long> {
}