package com.lifelinepathlab.sevice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lifelinepathlab.exception.ResourceNotFoundException;
import com.lifelinepathlab.model.ScheduleAppointment;
import com.lifelinepathlab.repository.ScheduleAppointmentRepository;


@Service
public class ScheduleAppointmentService {
	
	@Autowired
	ScheduleAppointmentRepository scheAppointmentRepositoryRef;

	public void scheduleAppointment(ScheduleAppointment scheduleAppointment) {
		scheAppointmentRepositoryRef.save(scheduleAppointment);
	}

	public List<ScheduleAppointment> getAllAppointments() {
		List<ScheduleAppointment> allAppointments = scheAppointmentRepositoryRef.findAll();
		return allAppointments;
	}

	public ScheduleAppointment getAppointmentById(int appointmentId) {
		ScheduleAppointment userAppointment = scheAppointmentRepositoryRef.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not available with this Appointment Id: ", appointmentId));
		return userAppointment;
	}

	public ScheduleAppointment updateAppointmentSchedule(ScheduleAppointment newUserAppointment, int appointmentId) {
		ScheduleAppointment oldUserAppointment = scheAppointmentRepositoryRef.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not available with this Appointment Id: ", appointmentId));
		oldUserAppointment.setPatientName(newUserAppointment.getPatientName());
		oldUserAppointment.setPatientContactNo(newUserAppointment.getPatientContactNo());
		oldUserAppointment.setPatientAddress(newUserAppointment.getPatientAddress());
		oldUserAppointment.setScheduledTime(newUserAppointment.getScheduledTime());
		oldUserAppointment.setPrescriptionFilePath(newUserAppointment.getPrescriptionFilePath());

		scheAppointmentRepositoryRef.save(oldUserAppointment);
		return oldUserAppointment;
	}

	public void deleteAppointment(int appointmentId) {
		ScheduleAppointment userAppointment = scheAppointmentRepositoryRef.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not available with this Appointment Id: ", appointmentId));
		scheAppointmentRepositoryRef.delete(userAppointment);
	}
}
