package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart,Long> {
}
