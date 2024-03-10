package com.fullstack.backend.Services.User.Repo;

import com.fullstack.backend.Services.User.Model.AuthDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDetailsRepo extends JpaRepository<AuthDetails, Long> {

    AuthDetails findByEmail(String email);

}
