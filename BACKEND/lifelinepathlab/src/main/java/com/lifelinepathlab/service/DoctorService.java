package com.lifelinepathlab.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lifelinepathlab.exception.ResourceNotFoundException;
import com.lifelinepathlab.model.Doctor;
import com.lifelinepathlab.repository.DoctorRepository;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public String saveDoctorLicense(MultipartFile licenseFile) throws IOException {
        String fileId = UUID.randomUUID().toString();
        return fileStorageService.storeFile(licenseFile, fileId, "doctor-licenses");
       
    }

    public Doctor saveDoctor(
            String name, String clinicName, String address, String email,
            String contact, String password, String specialization,
            int experience, MultipartFile licenseFile) throws IOException {
        String licenseFileId = saveDoctorLicense(licenseFile);

        Doctor doctor = new Doctor();
        doctor.setDoctorName(name);
        doctor.setClinicName(clinicName);
        doctor.setAddress(address);
        doctor.setEmailId(email);
        doctor.setContactNo(contact);
        doctor.setPassword(password);
        doctor.setSpecialization(specialization);
        doctor.setExperience(experience);
        doctor.setLicencePath(licenseFileId);
        System.out.println(doctor);

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(int id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " , id));
    }

    public void updateDoctor(
            int id, String name, String clinicName, String address, String email,
            String contact, String password, String specialization,
            int experience, MultipartFile licenseFile) throws IOException {
        Doctor existingDoctor = getDoctorById(id);

        String licenseFileId = saveDoctorLicense(licenseFile);

        existingDoctor.setDoctorName(name);
        existingDoctor.setClinicName(clinicName);
        existingDoctor.setAddress(address);
        existingDoctor.setEmailId(email);
        existingDoctor.setContactNo(contact);
        existingDoctor.setPassword(password);
        existingDoctor.setSpecialization(specialization);
        existingDoctor.setExperience(experience);
        existingDoctor.setLicencePath(licenseFileId);

        doctorRepository.save(existingDoctor);
    }

    public void deleteDoctor(int id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }
}
