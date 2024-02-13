package com.lifelinepathlab.model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "AppointmentSchedule")
public class ScheduleAppointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentId;
	private String patientName;
	private String patientContactNo;
	private String patientAddress;
	private Date ScheduledTime;
	private String prescriptionFilePath;

	public ScheduleAppointment() {
		// TODO Auto-generated constructor stub
	}

	public ScheduleAppointment(int appointmentId, String patientName, String patientContactNo, String patientAddress,
			Date scheduledTime, String prescriptionFilePath) {
		super();
		this.appointmentId = appointmentId;
		this.patientName = patientName;
		this.patientContactNo = patientContactNo;
		this.patientAddress = patientAddress;
		ScheduledTime = scheduledTime;
		this.prescriptionFilePath = prescriptionFilePath;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatientContactNo() {
		return patientContactNo;
	}

	public void setPatientContactNo(String patientContactNo) {
		this.patientContactNo = patientContactNo;
	}

	public String getPatientAddress() {
		return patientAddress;
	}

	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}

	public Date getScheduledTime() {
		return ScheduledTime;
	}

	public void setScheduledTime(Date scheduledTime) {
		ScheduledTime = scheduledTime;
	}

	public String getPrescriptionFilePath() {
		return prescriptionFilePath;
	}

	public void setPrescriptionFilePath(String prescriptionFilePath) {
		this.prescriptionFilePath = prescriptionFilePath;
	}

	@Override
	public String toString() {
		return "ScheduleAppointment [appointmentId=" + appointmentId + ", patientName=" + patientName
				+ ", patientContactNo=" + patientContactNo + ", patientAddress=" + patientAddress + ", ScheduledTime="
				+ ScheduledTime + ", prescriptionFilePath=" + prescriptionFilePath + "]";
	}

}
