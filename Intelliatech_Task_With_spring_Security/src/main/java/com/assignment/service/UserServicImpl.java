package com.assignment.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.model.User;
import com.assignment.model.UserRole;
import com.assignment.repository.RoleRepository;
import com.assignment.repository.UserRepository;

@Service
public class UserServicImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override

	// creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {

		User local = this.userRepository.findByUsername(user.getUsername());

		if (local != null) {
			System.out.println("User already there");

			throw new Exception("user already present");

		}

		for (UserRole ur : userRoles) {
			roleRepository.save(ur.getRole());
		}

		user.getUserRole().addAll(userRoles);
		local = this.userRepository.save(user);

		return local;

	}

	// getting user by username
	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(int id) {
		this.roleRepository.deleteById(id);
	}

}
