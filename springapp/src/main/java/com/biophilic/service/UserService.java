package com.biophilic.service;

import com.biophilic.entity.User;
import com.biophilic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(String username, String email, String password, User.Role role, Long customerId) {
        return createUser(username, email, password, role, customerId, null);
    }

    public User createUser(String username, String email, String password, User.Role role, Long customerId, String firstName) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(role);
        user.setCustomerId(customerId);
        
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean validatePassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPasswordHash());
    }

    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }

    public List<User> getUsersByCustomer(Long customerId) {
        return userRepository.findByCustomerId(customerId);
    }

    public void resetTestUserPasswords() {
        // Reset admin password
        userRepository.findByEmail("admin@plantondesk.com").ifPresent(user -> {
            user.setPasswordHash(passwordEncoder.encode("plantondesk123"));
            userRepository.save(user);
        });
        
        // Reset customer password
        userRepository.findByEmail("customer1@greencorp.com").ifPresent(user -> {
            user.setPasswordHash(passwordEncoder.encode("customer123"));
            userRepository.save(user);
        });
        
        // Reset technician password
        userRepository.findByEmail("maintenance1@plantondesk.com").ifPresent(user -> {
            user.setPasswordHash(passwordEncoder.encode("plantondesk123"));
            userRepository.save(user);
        });
    }
}