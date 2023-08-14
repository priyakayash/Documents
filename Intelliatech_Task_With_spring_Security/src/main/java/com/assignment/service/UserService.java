package com.assignment.service;

import java.util.Set;

import com.assignment.model.User;
import com.assignment.model.UserRole;

public interface UserService {

	// creating user

	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	// get user by username
	public User getUser(String username);

	// delete user by id

	public void deleteUser(int id);
}
