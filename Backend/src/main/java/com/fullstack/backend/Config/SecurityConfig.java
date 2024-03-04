package com.fullstack.backend.Config;

import com.fullstack.backend.Services.UserServices.UserDetailService;
import com.okta.spring.boot.oauth.Okta;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String API_BOOKS_SECURE = "/api/books/secure/**";
    private static final String API_REVIEWS_SECURE = "/api/reviews/secure/**";
    private static final String API_SECURE = "api/secure/**";
    private static final String API_QnA_SECURE = "/api/QnA/secure/**";
    private static final String API_BOOKS = "/api/books/**";
    private static final String API_REVIEWS = "/api/reviews/**";
    private static final String API_HISTORY = "/api/history/**";
    private static final String API_QnA = "/api/QnA/**";

    private final UserDetailService userDetailService;
//    private final JWTAuthenticationFilter jwtAuthFilter;
//    private final JwtAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers(
                                        API_BOOKS_SECURE,
                                        API_REVIEWS_SECURE,
                                        API_SECURE,
                                        API_QnA_SECURE
                                )
                                .authenticated()
                                .requestMatchers(
                                        API_BOOKS,
                                        API_REVIEWS,
                                        API_HISTORY,
                                        API_QnA,
                                        "/actuator",
                                        "/actuator/*"
                                ).permitAll())
                .oauth2ResourceServer((oauth2) -> oauth2
                        .jwt(Customizer.withDefaults())
                )
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider())
//                .exceptionHandling(e -> e
//                        .authenticationEntryPoint(jwtAuthenticationEntryPoint))
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        http.cors(Customizer.withDefaults());
        Okta.configureResourceServer401ResponseBody(http);

        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }

//    @Bean
//    public AuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//        authenticationProvider.setUserDetailsService(userDetailService);
//        authenticationProvider.setPasswordEncoder(passwordEncoder());
//
//        return authenticationProvider;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }

}