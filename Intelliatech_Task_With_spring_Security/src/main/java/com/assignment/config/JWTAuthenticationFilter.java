package com.assignment.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.assignment.service.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JWTAuthenticationFilter  extends OncePerRequestFilter {

	@Autowired
	private JWTUtils jwtUtils;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
									FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

	final String requestTokenHeader = 	request.getHeader("Authorization");
	System.out.println(requestTokenHeader);

		String username=null;
		String jwtToken=null;

		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer "))
		{
			jwtToken=requestTokenHeader.substring(7);
			try {
		username=	this.jwtUtils.extractUsername(jwtToken);

			}catch(ExpiredJwtException e)	{
				e.printStackTrace();
				 System.out.println("jwt token has expired");

			}catch(Exception e)
			{
				e.printStackTrace();
				System.out.println("error");
			}


		}else {
			System.out.println("Invalid Token , not start with bearer string");
		}


		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
		UserDetails userDetails=	this.userDetailsServiceImpl.loadUserByUsername(username);
		if(this.jwtUtils.validateToken(jwtToken, userDetails)) {

			UsernamePasswordAuthenticationToken usernamePasswordAuthentication= new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());


			usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
		}

		}else {
			System.out.println("Token is not valid");
		}
		filterChain.doFilter(request, response);

	}

}