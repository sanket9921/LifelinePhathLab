package com.lifelinepathlab.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lifelinepathlab.model.Doctor;
import com.lifelinepathlab.model.User;
import com.lifelinepathlab.sevice.DoctorService;
import com.lifelinepathlab.validations.Validations;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
	
	@Autowired
	private Validations validationsRef;
	@Autowired
	private DoctorService doctorServiceRef;
	
	// To create a new doctor...
		@PostMapping()
		public ResponseEntity<String> addDoctor(@RequestBody Doctor doctor, BindingResult result) {

			validationsRef.validate(doctor, result);
			if (result.hasErrors()) {
				// Handle validation errors
				String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
				return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
			}

			doctorServiceRef.addDoctor(doctor);
			return ResponseEntity.ok("Doctor added successfully...!!!");
		}
		
		// To get all doctors...
		@GetMapping()
		public ResponseEntity<List<Doctor>> getDoctors() {
			List<Doctor> doctors = doctorServiceRef.getDoctors();
			return ResponseEntity.ok(doctors);
		}
		
		// To get doctor resource by doctor Id...
		@GetMapping("/{doctorId}")
		public ResponseEntity<Doctor> getDoctor(@PathVariable int doctorId) {
			Doctor doctor = doctorServiceRef.getDoctor(doctorId);
			return ResponseEntity.ok(doctor);
		}
		
		// To update the doctor details...
		@PutMapping("/{doctorId}")
		public ResponseEntity<String> updateDoctor(@RequestBody Doctor newDoctor, @PathVariable int doctorId,
				BindingResult result) {
			validationsRef.validate(newDoctor, result);
			if (result.hasErrors()) {
				// Handle validation errors
				String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
				return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
			}
			
			doctorServiceRef.updateDoctor(newDoctor, doctorId);
			return ResponseEntity.ok("Doctor details updated successfully...!!!");
		}

		// To delete the doctor...
		@DeleteMapping("/{doctorId}")
		public ResponseEntity<Doctor> deleteDoctor(@PathVariable int doctorId) {
			doctorServiceRef.deleteDoctor(doctorId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

}
