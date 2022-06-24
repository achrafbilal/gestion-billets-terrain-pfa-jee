package com.achrafbilal.main.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoderCustom();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        final String admin = "ADMIN";
        final String seller = "SELLER";
        final String client = "CLIENT";

        http
                .csrf().disable()
                .cors().disable()
                .authorizeHttpRequests()
                // .antMatchers("/**").permitAll()
                .antMatchers("/users/login", "/users/register").permitAll()// Working fine
                .antMatchers(HttpMethod.POST, "/tickets").hasAnyAuthority(seller, admin)
                .antMatchers(HttpMethod.GET, "/zones", "/users/role/3").hasAnyAuthority(seller, admin)
                .antMatchers("/tickets/client/**").hasAnyAuthority(client, admin)// Working fine
                // .anyRequest().authenticated()
                .and().httpBasic();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

    }

}
