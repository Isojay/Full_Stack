//package com.fullstack.backend.JWT;
//
//import com.fullstack.backend.Services.User.Service.UserDetailService;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Service
//@Slf4j
//public class JwtService {
//
//    private final UserDetailService service;
//    @Value("${jwt.secret.key}")
//    private String secretKey;
//
//    public JwtService(UserDetailService service) {
//        this.service = service;
//    }
//
//    public String extractUsername(String token) throws uJwtException {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) throws uJwtException {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    //UserDetails Can be Extracted through user email : userdetailservice in service package
//    public String generateToken(String username) {
//        UserDetails userDetails = service.loadUserByUsername(username);
//
//        Map<String, Object> claims = new HashMap<>();
//        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
//
//        Map<String, Object> userInfo = new HashMap<>();
//
//        userInfo.put("USER_ID", userDetails.getUsername());
//
//        userInfo.put("IsAuthenticated", true);
//
//        String role = roles.contains(new SimpleGrantedAuthority("ADMIN")) ? "ADMIN" :
//                roles.contains(new SimpleGrantedAuthority("USER")) ? "USER" : null;
//
//        if (role != null) {
//            userInfo.put("USER_ROLE", role);
//        }
//
//        claims.put("userInfo", userInfo);
//
//        return generateTokenWithClaims(claims, userDetails);
//    }
//
//    private String generateTokenWithClaims(Map<String, Object> claims, UserDetails userDetails) {
//        System.out.println(claims);
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public boolean isTokenValid(String token, UserDetails userDetails) throws Exception {
//
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//    }
//
//    private boolean isTokenExpired(String token) throws Exception {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) throws Exception {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    private Claims extractAllClaims(String token) throws uJwtException {
//        try {
//            return Jwts.parserBuilder()
//                    .setSigningKey(getSignInKey())
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//        } catch (ExpiredJwtException e) {
//            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage(), e);
//        } catch (JwtException e) {
//            log.error("Error parsing JWT with message: " + e.getMessage());
//            throw new uJwtException(e.getMessage());
//        }
//    }
//
//    private Key getSignInKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//}