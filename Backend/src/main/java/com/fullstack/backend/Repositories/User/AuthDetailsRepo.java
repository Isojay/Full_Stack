package com.fullstack.backend.Repositories.User;

import com.fullstack.backend.Model.Users.AuthDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDetailsRepo extends JpaRepository<AuthDetails, Long> {

    AuthDetails findByEmail(String email);

}
