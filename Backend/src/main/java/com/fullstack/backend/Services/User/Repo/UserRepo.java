package com.fullstack.backend.Services.User.Repo;

import com.fullstack.backend.Services.User.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, String> {


}
