package com.fullstack.backend.Repositories;

import com.fullstack.backend.Model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface HistoryRepo extends JpaRepository<History, Long> {

    Page<History> findByUserEmailIgnoreCase(String userEmail, Pageable pageable);

    @Modifying
    @Query("DELETE from history where user_email = :userEmail")
    void deleteAllByUserEmailIgnoreCase(@Param("userEmail") String userEmail);

    List<History> findAllByUserEmailIgnoreCase(String userEmail);


}
