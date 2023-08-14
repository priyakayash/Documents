package com.assignment.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {

	private String Authority;

	public Authority(String authority) {
		super();
		Authority = authority;
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.Authority;
	}

}
