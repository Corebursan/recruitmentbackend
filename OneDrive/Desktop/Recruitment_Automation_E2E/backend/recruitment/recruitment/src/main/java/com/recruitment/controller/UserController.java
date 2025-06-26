package com.recruitment.controller;

import com.recruitment.entity.User;
import com.recruitment.repository.UserRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepo repo;

    // ✅ Register new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repo.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        repo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ Login existing user and store in session
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        Optional<User> optionalUser = repo.findByEmail(user.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        User existingUser = optionalUser.get();
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        session.setAttribute("user", existingUser);
        return ResponseEntity.ok("Login successful");
    }

    // ✅ Get current logged-in user
    @GetMapping("/current-user")
    public ResponseEntity<?> currentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }
        return ResponseEntity.ok(user);
    }

    // ✅ Logout the user
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
}
