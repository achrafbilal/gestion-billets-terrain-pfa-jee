package com.achrafbilal.main.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")

                        // .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH")
                        // .allowedHeaders("*")
                        // .allowCredentials(true)
                        .allowedOrigins("http://localhost:3000");
            }
        };
    }
}
