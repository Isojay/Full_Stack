package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.CheckOut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckOutRepo extends JpaRepository<CheckOut, Long> {

    CheckOut findByUserEmailIgnoreCaseAndBookId(String userEmail, Long id);

    List<CheckOut> findByUserEmailIgnoreCase(String userEmail);

}
