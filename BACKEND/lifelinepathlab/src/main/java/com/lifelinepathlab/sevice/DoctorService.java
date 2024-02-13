package com.lifelinepathlab.sevice;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lifelinepathlab.exception.ResourceNotFoundException;
import com.lifelinepathlab.model.Doctor;
import com.lifelinepathlab.repository.DoctorRepository;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository doctorRepositoryRef;

	public void addDoctor(Doctor doctor) {
		doctorRepositoryRef.save(doctor);
	}

	public List<Doctor> getDoctors() {
		List<Doctor> doctors = doctorRepositoryRef.findAll();
		return doctors;
	}

	public Doctor getDoctor(int doctorId) {
		Doctor doctor = doctorRepositoryRef.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor does not exits with Doctor Id: ", doctorId));
		return doctor;
	}

	public Doctor updateDoctor(Doctor newDoctor, int doctorId) {
		Doctor oldDoctor = doctorRepositoryRef.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor does not exits with Doctor Id: ", doctorId));
		oldDoctor.setDoctorName(newDoctor.getDoctorName());
		oldDoctor.setClinicName(newDoctor.getClinicName());
		oldDoctor.setEmailId(newDoctor.getEmailId());
		oldDoctor.setContactNo(newDoctor.getContactNo());
		oldDoctor.setSpecialization(newDoctor.getSpecialization());
		oldDoctor.setExperience(newDoctor.getExperience());
		oldDoctor.setLicencePath(newDoctor.getLicencePath());
		oldDoctor.setAddress(newDoctor.getAddress());
		oldDoctor.setPassword(newDoctor.getPassword());
		doctorRepositoryRef.save(oldDoctor);

		return oldDoctor;
	}

	public void deleteDoctor(int doctorId) {
		Doctor doctor = doctorRepositoryRef.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor does not exits with Doctor Id: ", doctorId));
		doctorRepositoryRef.delete(doctor);
	}

}
