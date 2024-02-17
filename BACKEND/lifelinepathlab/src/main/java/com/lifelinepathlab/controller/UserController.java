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

import com.lifelinepathlab.model.ClientFeedback;
import com.lifelinepathlab.model.User;
import com.lifelinepathlab.sevice.UserService;
import com.lifelinepathlab.validations.Validations;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private Validations validationsRef;
	@Autowired
	private UserService userServiceRef;

	// To create a new user...
	@PostMapping()
	public ResponseEntity<String> addUser(@RequestBody User user, BindingResult result) {

		validationsRef.validate(user, result);
		if (result.hasErrors()) {
			// Handle validation errors
			String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
		}

		userServiceRef.addUser(user);
		return ResponseEntity.ok("User added successfully...!!!");
	}

	// To get all users...
	@GetMapping()
	public ResponseEntity<List<User>> getUsers() {
		List<User> users = userServiceRef.getUsers();
		return ResponseEntity.ok(users);
	}

	// To get user resource by user Id...
	@GetMapping("/{userId}")
	public ResponseEntity<User> getUser(@PathVariable int userId) {
		User user = userServiceRef.getUser(userId);
		return ResponseEntity.ok(user);
	}

	// To update the user details...
	@PutMapping("/{userId}")
	public ResponseEntity<String> updateUser(@RequestBody User newUser, @PathVariable int userId,
			BindingResult result) {
		validationsRef.validate(newUser, result);
		if (result.hasErrors()) {
			// Handle validation errors
			String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
		}

		userServiceRef.updateUser(newUser, userId);
		return ResponseEntity.ok("User details updated successfully...!!!");
	}
	
	// To get all Admins...
	@GetMapping("/admins")
	public ResponseEntity<List<User>> getAdminByRole() {
		List<User> allAdmins = userServiceRef.getAdminByRole();
		return ResponseEntity.ok(allAdmins);
	}
	
	// To get all Admins...
	@PutMapping("/admins/{userId}")
	public ResponseEntity<String> updateUserRole(@PathVariable("userId") int userId) {
		userServiceRef.updateUserRole(userId);
		return ResponseEntity.ok("User Is Made admin successfully...!!!");
	}
	
	// To get all Users...
	@GetMapping("/patients")
	public ResponseEntity<List<User>> getUsersByRole() {
		List<User> allUsers = userServiceRef.getUsersByRole();
		return ResponseEntity.ok(allUsers);
	}

	// To delete the user...
	@DeleteMapping("/{userId}")
	public ResponseEntity<User> deleteUser(@PathVariable int userId) {
		userServiceRef.deleteUser(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
