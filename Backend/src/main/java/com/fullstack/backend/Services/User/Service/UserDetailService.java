package com.fullstack.backend.Services.User.Service;


import com.fullstack.backend.Services.User.Model.AuthDetails;
import com.fullstack.backend.Services.User.Repo.AuthDetailsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final AuthDetailsRepo authDetailsRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthDetails user = authDetailsRepo.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        return user;
    }
}