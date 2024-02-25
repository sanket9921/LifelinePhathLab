package com.lifelinepathlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lifelinepathlab.model.Report;

public interface ReportRepository extends JpaRepository<Report, Integer>{
	
	@Query("SELECT r FROM Report r WHERE r.doctor.emailId = :emailId")
	public List<Report> getByDoctorByEmailId(@Param("emailId") String emailId);
	  
  

}
