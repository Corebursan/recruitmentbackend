//package com.recruitment.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//
//@Entity
//public class Job {
//	
//	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String company;
//    private String location;
//    private String salary;
//    private String experience;
//    private String jobType;
//    private String description;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User postedBy;
//
//	public Job(Long id, String title, String company, String location, String salary, String experience, String jobType,
//			String description, User postedBy) {
//		super();
//		this.id = id;
//		this.title = title;
//		this.company = company;
//		this.location = location;
//		this.salary = salary;
//		this.experience = experience;
//		this.jobType = jobType;
//		this.description = description;
//		this.postedBy = postedBy;
//	}
//    
//    public Job() {
//    	
//    }
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String getCompany() {
//		return company;
//	}
//
//	public void setCompany(String company) {
//		this.company = company;
//	}
//
//	public String getLocation() {
//		return location;
//	}
//
//	public void setLocation(String location) {
//		this.location = location;
//	}
//
//	public String getSalary() {
//		return salary;
//	}
//
//	public void setSalary(String salary) {
//		this.salary = salary;
//	}
//
//	public String getExperience() {
//		return experience;
//	}
//
//	public void setExperience(String experience) {
//		this.experience = experience;
//	}
//
//	public String getJobType() {
//		return jobType;
//	}
//
//	public void setJobType(String jobType) {
//		this.jobType = jobType;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	public User getPostedBy() {
//		return postedBy;
//	}
//
//	public void setPostedBy(User postedBy) {
//		this.postedBy = postedBy;
//	}
//    
//    
//
//}
