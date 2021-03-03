package com.zooplus.poc.service;

/**
 * Counter service
 * 
 * @author Thibaut Caselli
 */
public interface CounterService
{

	/**
	 * Get counter
	 *
	 * @return the counter value
	 */
	int getCounter();

	/**
	 * Increment counter
	 *
	 * @return the counter value
	 */
	int incrementCounter();

}
