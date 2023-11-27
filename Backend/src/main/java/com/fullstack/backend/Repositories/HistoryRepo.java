package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepo extends JpaRepository<History,Long> {

    Page<History> findByUserEmailIgnoreCase(String userEmail, Pageable pageable);

    History deleteByUserEmailIgnoreCase(String userEmail);

}
