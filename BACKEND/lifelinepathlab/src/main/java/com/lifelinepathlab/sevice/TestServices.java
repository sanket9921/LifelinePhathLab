package com.lifelinepathlab.sevice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lifelinepathlab.exception.ResourceNotFoundException;
import com.lifelinepathlab.model.Test;
import com.lifelinepathlab.repository.TestRepository;

@Service
public class TestServices {
	
	@Autowired
	TestRepository testRepositoryRef;
	
	public void addTest(Test test) {
		testRepositoryRef.save(test);
	}

	public List<Test> getTests() {
		List<Test> tests = testRepositoryRef.findAll();
		return tests;
	}

	public Test getTestById(int testId) {
		Test test = testRepositoryRef.findById(testId)
				.orElseThrow(() -> new ResourceNotFoundException("Test does not exists with test Id: ", testId));
		return test;
	}

	public Test updateTest(Test newTest, int testId) {
		Test oldTest = testRepositoryRef.findById(testId)
				.orElseThrow(() -> new ResourceNotFoundException("Test does not exists with test Id: ", testId));
		oldTest.setTestName(newTest.getTestName());
		oldTest.setTestType(newTest.getTestType());
		oldTest.setTestDescription(newTest.getTestDescription());
		oldTest.setActualPrice(newTest.getActualPrice());
		oldTest.setDiscount(newTest.getDiscount());
		oldTest.setFinalPrice(newTest.getFinalPrice());
		oldTest.setTestImagePath(newTest.getTestImagePath());
		testRepositoryRef.save(oldTest);

		return oldTest;
	}

	public void deleteTest(int testId) {
		Test test = testRepositoryRef.findById(testId)
				.orElseThrow(() -> new ResourceNotFoundException("Test does not exists with test Id: ", testId));
		testRepositoryRef.delete(test);
	}

}
