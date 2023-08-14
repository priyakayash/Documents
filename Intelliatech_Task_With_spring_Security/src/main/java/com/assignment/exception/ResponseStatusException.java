package com.assignment.exception;

import org.springframework.http.HttpStatus;

public class ResponseStatusException extends RuntimeException {

	public ResponseStatusException(HttpStatus badRequest, String message) {
		// TODO Auto-generated constructor stub
		super(message);

	}
}
