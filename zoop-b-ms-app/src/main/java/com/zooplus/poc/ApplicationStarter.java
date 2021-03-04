package com.zooplus.poc;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.stream.Stream;



/**
 * Application starter
 *
 * @author Thibaut Caselli
 */
@SpringBootApplication
public class ApplicationStarter {


	private static final Logger logger = LogManager.getLogger(ApplicationStarter.class);

	/**
	 * Entry point
	 *
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception { 
		logger.debug("Launching application with args {}", Arrays.asList(args));
		new SpringApplication(ApplicationStarter.class).run(args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
						.addMapping("/**")
						.allowCredentials(true)
						.allowedMethods(
								Stream.of(HttpMethod.GET, HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.HEAD)
										.map(Object::toString)
										.toArray(String[]::new))
						.allowedOrigins("http://localhost:1900","http://localhost:1901","http://localhost:1902")	
						.allowedHeaders("*");
			}
		};
	}

}