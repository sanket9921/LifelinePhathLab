package com.lifelinepathlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.lifelinepathlab.model.Test;

@Repository
public interface TestRepository  extends JpaRepository<Test, Integer>{

	public List<Test> findByTestType(String type);
	
	@Query("SELECT DISTINCT t.testType FROM Test t")
    List<String> findDistinctTestTypes();
		
	
}
