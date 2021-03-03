package com.zooplus.poc.service;

import org.springframework.stereotype.Service;


/**
 * Implementation of {@link CounterService}
 * 
 * @author Thibaut Caselli
 */
@Service
public class CounterServiceImpl implements CounterService
{

	private int counter;

	@Override
	public int getCounter()
	{
		return counter;
	}

	@Override
	public int incrementCounter()
	{
		return ++counter;
	}

}
