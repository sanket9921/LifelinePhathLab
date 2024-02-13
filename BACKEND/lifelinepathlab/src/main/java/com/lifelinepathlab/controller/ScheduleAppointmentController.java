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
import com.lifelinepathlab.model.ScheduleAppointment;
import com.lifelinepathlab.sevice.ScheduleAppointmentService;
import com.lifelinepathlab.validations.Validations;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/appointment")
public class ScheduleAppointmentController {
	
	@Autowired
	private Validations validationsRef;
	@Autowired
	ScheduleAppointmentService scheduleAppointmentServiceRef;

	// To Schedule a new appointment...
	@PostMapping()
	public ResponseEntity<String>  scheduleAppointment(@RequestBody ScheduleAppointment scheduleAppointment, BindingResult result) {

		validationsRef.validate(scheduleAppointment, result);
		if (result.hasErrors()) {
			// Handle validation errors
			String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
		}

		scheduleAppointmentServiceRef.scheduleAppointment(scheduleAppointment);
		return ResponseEntity.ok("Appointment schedule request successful...!!!");
	}
	
	// To get all appointments...
	@GetMapping()
	public ResponseEntity<List<ScheduleAppointment>> getAllFeedbacks() {
		List<ScheduleAppointment> allAppointments = scheduleAppointmentServiceRef.getAllAppointments();
		return ResponseEntity.ok(allAppointments);
	}
	
	// To get appointment by Id...
	@GetMapping("/{appointmentId}")
	public ResponseEntity<ScheduleAppointment> getAppointmentById(@PathVariable int appointmentId) {
		ScheduleAppointment userAppointment = scheduleAppointmentServiceRef.getAppointmentById(appointmentId);
		return ResponseEntity.ok(userAppointment);
	}
	
	// To update the Appointment details...
	@PutMapping("/{appointmentId}")
	public ResponseEntity<String> updateAppointmentSchedule(@RequestBody ScheduleAppointment updatedUserAppointment, @PathVariable int appointmentId,
			BindingResult result) {
		validationsRef.validate(updatedUserAppointment, result);
		if (result.hasErrors()) {
			// Handle validation errors
			String errorMessage = result.getFieldErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
		}
		
		scheduleAppointmentServiceRef.updateAppointmentSchedule(updatedUserAppointment, appointmentId);
		return ResponseEntity.ok("Appointment details updated successfully...!!!");
	}

	// To delete the Appointment...
	@DeleteMapping("/{appointmentId}")
	public ResponseEntity<ScheduleAppointment> deleteAppointment(@PathVariable int appointmentId) {
		scheduleAppointmentServiceRef.deleteAppointment(appointmentId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
