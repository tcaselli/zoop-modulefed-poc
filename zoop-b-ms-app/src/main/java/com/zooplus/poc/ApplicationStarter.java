package com.zooplus.poc;

import java.util.Arrays;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * Application starter
 *
 * @author Thibaut Caselli
 */
@SpringBootApplication
public class ApplicationStarter
{
	private static final Logger logger = LogManager.getLogger(ApplicationStarter.class);

	/**
	 * Entry point
	 *
	 * @param args
	 * @throws Exception
	 */
	public static void main(final String[] args) throws Exception
	{
		logger.debug("Launching application with args {}", Arrays.asList(args));
		new SpringApplication(ApplicationStarter.class).run(args);
	}
}
