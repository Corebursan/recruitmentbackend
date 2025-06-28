package com.recruitment.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recruitment.entity.Employee;

import com.recruitment.repository.EmployeeRepo;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth/employee")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepo repo;
	
	 // ✅ Register new Employee
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Employee emp) {
        if (repo.existsByEmail(emp.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        repo.save(emp);
        return ResponseEntity.ok("Employee registered successfully");
    }
    
 // ✅ Login employee
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee emp, HttpSession session) {
    	
    	System.out.println("login is triggered");
        Optional<Employee> optionalUser = repo.findByEmail(emp.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Employee not found");
        }

        Employee existingEmp = optionalUser.get();
        if (!existingEmp.getPassword().equals(emp.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        session.setAttribute("employee", existingEmp);
        return ResponseEntity.ok("Login successful");
    }
    
 // ✅ Get current logged-in employee
    @GetMapping("/current-employee")
    public ResponseEntity<?> currentUser(HttpSession session) {
        Employee emp = (Employee) session.getAttribute("employee");
        if (emp == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }
        return ResponseEntity.ok(emp);
    }
    
 // ✅ Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

}
