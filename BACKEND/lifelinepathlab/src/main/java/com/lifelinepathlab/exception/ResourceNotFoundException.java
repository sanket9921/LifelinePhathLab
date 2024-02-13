package com.lifelinepathlab.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
	
	private int userId;
	
	public ResourceNotFoundException(String msg, int userId) {
		super(msg);
		this.userId=userId;
	}
	
	@Override 
	public String getMessage() {
		String msg = super.getMessage();
		String finalMessage = msg + "===>" + userId;
		return finalMessage;
	}

}
