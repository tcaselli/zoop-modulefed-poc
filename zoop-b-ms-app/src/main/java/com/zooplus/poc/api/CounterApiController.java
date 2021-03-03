package com.zooplus.poc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zooplus.poc.service.CounterService;

import io.swagger.annotations.Api;


/**
 * Implementation of Counter API
 *
 * @author Thibaut Caselli
 */
@Controller
@Api(value = "Counter", tags = { "Counter" })
@RequestMapping("/v1")
public class CounterApiController implements CounterApi
{

	@Autowired
	private CounterService counterService;

	@Override
	public ResponseEntity<Integer> getCounter()
	{
		return ResponseEntity.ok(counterService.getCounter());
	}

	@Override
	public ResponseEntity<Integer> incrementCounter()
	{
		return ResponseEntity.ok(counterService.incrementCounter());
	}

}
