package com.lifelinepathlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lifelinepathlab.model.ScheduleAppointment;

@Repository
public interface ScheduleAppointmentRepository extends JpaRepository<ScheduleAppointment, Integer> {

}
