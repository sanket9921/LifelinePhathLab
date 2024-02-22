package com.lifelinepathlab.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.lifelinepathlab.security.JwtAuthenticationEntryPoint;
import com.lifelinepathlab.security.JwtAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;
    
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())  
                .cors(cors -> cors.disable())

                .authorizeHttpRequests((auth) -> auth.requestMatchers(HttpMethod.POST,"home/**").authenticated()
 	
                		.requestMatchers("api/user/login").permitAll()
                		.requestMatchers("/api/user/**").permitAll()
                		.requestMatchers("/api/feedback/**").permitAll()
        
                		.requestMatchers("/api/tests/all/**").permitAll()
                		.requestMatchers("/api/tests/**").permitAll()
                		.requestMatchers("/api/tests/create/**").permitAll()
                		.requestMatchers("/api/tests/testName/**").permitAll()
                		.requestMatchers("/api/tests/TestType").permitAll()
                		.requestMatchers("/api/tests/bestOffers").permitAll()
                		.requestMatchers("/api/orders/**").permitAll()
                		.requestMatchers("/api/tests/create/**").permitAll()
                		.requestMatchers("/api/orders/addOrder/**").permitAll()
                		.requestMatchers("/api/orders/cartOrders/**").permitAll()
                		.anyRequest().authenticated()                		
                )              
                		
                .exceptionHandling(ex ->ex.authenticationEntryPoint(point))
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                ; 
                  
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
    @Bean
    public DaoAuthenticationProvider doDaoAuthenticationProvider() {
    	DaoAuthenticationProvider daoAuthenticationProvider = new  DaoAuthenticationProvider();
    	daoAuthenticationProvider.setUserDetailsService(userDetailsService);
    	daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
    	return daoAuthenticationProvider;
    }

}