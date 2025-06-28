//package com.recruitment.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.recruitment.entity.Job;
//import com.recruitment.entity.User;
//import com.recruitment.repository.JobRepository;
//import com.recruitment.repository.UserRepo;
//
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/api/jobs")
//@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
//public class JobController {
//
//    @Autowired private JobRepository jobRepo;
//    @Autowired private UserRepo userRepo;
//
//    @PostMapping
//    public ResponseEntity<?> addJob(@RequestBody Job job, HttpSession session) {
//        User user = (User) session.getAttribute("user");
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
//        }
//
//        job.setPostedBy(user);
//        jobRepo.save(job);
//        return ResponseEntity.ok("Job posted successfully");
//    }
//}
//
