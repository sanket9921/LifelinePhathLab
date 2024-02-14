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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifelinepathlab.model.ClientFeedback;
import com.lifelinepathlab.model.Test;
import com.lifelinepathlab.sevice.TestServices;
import com.lifelinepathlab.validations.Validations;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@Autowired
	private Validations validationsRef;
	@Autowired
	TestServices testServicesRef;
	
	// To add a new test...
		@PostMapping()
		public ResponseEntity<String>  addTest(@RequestBody Test test, BindingResult result) {

			validationsRef.validate(test, result);
			if (result.hasErrors()) {
				// Handle validation errors
				String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
				return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
			}

			testServicesRef.addTest(test);
			return ResponseEntity.ok("New Test Added successfully...!!!");
		}
		
		// To get all tests...
		@GetMapping()
		public ResponseEntity<List<Test>> getTests() {
			List<Test> allTests = testServicesRef.getTests();
			return ResponseEntity.ok(allTests);
		}
		
		// To get test by Id...
		@GetMapping("/{testId}")
		public ResponseEntity<Test> getTestById(@PathVariable int testId) {
			Test test = testServicesRef.getTestById(testId);
			return ResponseEntity.ok(test);
		}
		
		// To delete the test...
		@DeleteMapping("/{testId}")
		public ResponseEntity<ClientFeedback> deleteTest(@PathVariable int testId) {
			testServicesRef.deleteTest(testId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

}
