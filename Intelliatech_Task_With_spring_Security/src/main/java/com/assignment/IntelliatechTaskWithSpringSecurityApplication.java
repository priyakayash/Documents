package com.assignment;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.assignment.model.Role;
import com.assignment.model.User;
import com.assignment.service.UserService;
import com.assignment.model.UserRole;

@SpringBootApplication
public class IntelliatechTaskWithSpringSecurityApplication implements CommandLineRunner {

//	@Autowired
//	private UserService userserService;

	public static void main(String[] args) {
		SpringApplication.run(IntelliatechTaskWithSpringSecurityApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

//		User user = new User();
//
//		user.setUsername("psbhavsar");
//		user.setPassword("1728");
//
//		Role role1 = new Role();
//		role1.setRoleId(1);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//		
//		User user1=this.userserService.createUser(user, userRoleSet);
//		
//		System.out.println(user1.getUsername());

	}

}
