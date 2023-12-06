package com.fullstack.backend.Repositories.User;

import com.fullstack.backend.Model.Users.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, String> {



}
