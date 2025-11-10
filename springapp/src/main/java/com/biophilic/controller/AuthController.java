package com.biophilic.controller;

import com.biophilic.dto.JwtResponse;
import com.biophilic.dto.LoginRequest;
import com.biophilic.dto.RegisterRequest;
import com.biophilic.entity.User;
import com.biophilic.security.JwtUtils;
import com.biophilic.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            System.out.println("Login attempt for user: " + user.getEmail() + " with role: " + user.getRole());

            if (!userService.validatePassword(user, request.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            String accessToken = jwtUtils.generateAccessToken(user.getEmail(), user.getRole().name());
            String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

            System.out.println("Successful login for role: " + user.getRole().name());

            return ResponseEntity.ok(new JwtResponse(
                accessToken, refreshToken, "Bearer", 
                user.getUserId(), user.getEmail(), user.getRole().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        try {
            String refreshToken = request.get("refreshToken");
            if (!jwtUtils.validateToken(refreshToken)) {
                throw new RuntimeException("Invalid refresh token");
            }

            String username = jwtUtils.getUsernameFromToken(refreshToken);
            User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            String newAccessToken = jwtUtils.generateAccessToken(user.getUsername(), user.getRole().name());
            
            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Validate password criteria
            if (!isValidPassword(request.getPassword())) {
                throw new RuntimeException("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
            }
            
            User.Role role = User.Role.valueOf(request.getRole().toUpperCase());
            
            // Validate role-specific passwords
            if (role == User.Role.ADMIN) {
                if (!"ADMIN1234".equals(request.getRolePassword())) {
                    throw new RuntimeException("Invalid admin password");
                }
            } else if (role == User.Role.TECHNICIAN) {
                if (!"WORKER1234".equals(request.getRolePassword())) {
                    throw new RuntimeException("Invalid maintenance worker password");
                }
            }
            
            System.out.println("Creating user with role: " + role);
            
            User user = userService.createUser(
                request.getEmail(), 
                request.getEmail(), 
                request.getPassword(), 
                role, 
                null,
                request.getFirstName()
            );
            
            System.out.println("User created successfully with role: " + user.getRole());
            
            String accessToken = jwtUtils.generateAccessToken(user.getEmail(), user.getRole().name());
            String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

            return ResponseEntity.ok(new JwtResponse(
                accessToken, refreshToken, "Bearer", 
                user.getUserId(), user.getEmail(), user.getRole().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    private boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpper = password.chars().anyMatch(Character::isUpperCase);
        boolean hasLower = password.chars().anyMatch(Character::isLowerCase);
        boolean hasDigit = password.chars().anyMatch(Character::isDigit);
        boolean hasSpecial = password.chars().anyMatch(ch -> "!@#$%^&*(),.?\":{}|<>".indexOf(ch) >= 0);
        
        return hasUpper && hasLower && hasDigit && hasSpecial;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/test-users")
    public ResponseEntity<?> testUsers() {
        try {
            var adminUsers = userService.getUsersByRole(User.Role.ADMIN);
            var customerUsers = userService.getUsersByRole(User.Role.CUSTOMER);
            var technicianUsers = userService.getUsersByRole(User.Role.TECHNICIAN);
            
            return ResponseEntity.ok(Map.of(
                "adminCount", adminUsers.size(),
                "customerCount", customerUsers.size(),
                "technicianCount", technicianUsers.size(),
                "adminEmails", adminUsers.stream().map(User::getEmail).toList()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}