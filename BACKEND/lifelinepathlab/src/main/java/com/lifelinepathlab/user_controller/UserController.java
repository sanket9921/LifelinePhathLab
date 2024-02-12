package com.lifelinepathlab.user_controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lifelinepathlab.model.User;
import com.lifelinepathlab.user_sevice.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userServiceRef;
	
	
	//To create a new user...
	@PostMapping()
	public ResponseEntity<User> addUser(@RequestBody User user) {
		User newUser = userServiceRef.addUser(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);	
	}
	
	//To get all users...
	@GetMapping()
	public List<User> getUsers() {
		List<User> users = userServiceRef.getUsers();
		return users;
	}
	
	//To get user resource by user Id...
	@GetMapping("/{userId}")
	public ResponseEntity<User> getUser(@PathVariable int userId) {
		User user = userServiceRef.getUser(userId);
		return ResponseEntity.ok(user);
	}
	
	//To update the user details...
	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@RequestBody User newUser,@PathVariable int userId) {
		User user= userServiceRef.updateUser(newUser, userId);
		return ResponseEntity.ok(user);
	}
	
	//To delete the user...
	@DeleteMapping("/{userId}")
	public ResponseEntity<User> deleteUser(@PathVariable int userId) {
		userServiceRef.deleteUser(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
