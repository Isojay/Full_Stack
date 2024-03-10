package com.fullstack.backend.Services.Error;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorRepository extends JpaRepository<ErrorResponse, String> {
}
