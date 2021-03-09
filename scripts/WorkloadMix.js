/*
Author: Satheesh Pandian
Date : 03-03-2021
Script name: WorkloadMix.js
Description: This script does the following
			 1. getCall retrieves all the cars details like id and model
			 2. postCall creates an id and model for the new car. The payload should have model with atleast 3 characters
			 3. putCall updates the model of the given id passed in the url
			 4. deleteCall deletes the car details of the given id passed in the url
*/

//importing the mandatory modules to run the script
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";


let errorCount = new Counter("errors"); // variable to count the errors
//let errorRate = new Counter("error_rate"); // variable to count the errors

/* 
	mixed workload scenario with the following load
	getCars: 10 users and execute for 20 seconds
	postCars: 10 users and execute for 20 seconds
	putCars: 5 users and execute for 20 seconds
	delCars: 1 users and execute for 20 seconds
*/

export let options = {
	discardResponseBodies: true,
	scenarios: {
		getCars: {
			executor: 'constant-vus',
			exec: 'getCars',
			vus: 10,
			duration: '30s'	
		},
		postCars: {
			executor: 'constant-vus',
			exec: 'postCars',
			vus: 10,
			duration: '30s'	
		},
		putCars: {
			executor: 'constant-vus',
			exec: 'putCars',
			vus: 5,
			duration: '30s'	
		},
		delCars: {
			executor: 'constant-vus',
			exec: 'delCars',
			vus: 1,
			duration: '20s'	
		},
	},
};

/* 
The following options defines how many virtual users should be executed, how long will be executed
threshold limit to stop the test (when the error count goes more than 10, the test will be stopped)
*/

/*
export const options = {
	vus: 10,
	duration: '15s',
	thresholds:{
		errors: ["count < 10"]
	}
};
*/

/*
The following options defines the ramp up pattern for each stage (step up testing) and its duration for each stage
*/

/*
export const options = {
	stages: [
		{ duration: '10s', target: 10},
		{ duration: '20s', target: 15},
		{ duration: '30s', target: 20},
		{ duration: '40s', target: 25},
		{ duration: '10s', target: 0},
	],
	thresholds:{
		errorRate: ["rate < 0.1"]
	}
};
*/
	//making getCall
export function getCars()
{
	const status = Math.floor(Math.random() * 10) + 1; // returns a random interger from 1 to 10
	//console.log(status);

	var url = 'http://host.docker.internal:8080/api/cars/'+status; // application url
 	let getRes = http.get(url,{
 								tags: 
 								{ 
 									my_custom_tag: 'getCars' 
 								},
 							  }
 						 );

	//checking the response for getCall is 200 or 404 (in case of the car not available) or not
	let getResultCheck = check(getRes, {
											"status is HTTP 200": g => g.status === 200 || g.status === 404 
										}
							  ); 

	//if respoonse code is not 200, then increase the error count
	if(!getResultCheck)
	{
		errorCount.add(1);
	}

	sleep(2); // waiting for 2 seconds
 		
	}


//making postCall
export function postCars()
{
	const status = Math.floor(Math.random() * 100) + 1; // returns a random interger from 1 to 100
	var url = "http://host.docker.internal:8080/api/cars"; // application url
	var payload = JSON.stringify({
  									'model':'XC' + status,
  								 }
  								); // payload to create new car
  
    var params = {
				    headers: 
				    {
				      'Content-Type': 'application/json',
				    },
  				 }; //header needs to be passed in the request

	let postRes = http.post(url, payload, params, {
													tags: 
													{ 
														my_custom_tag: 'postCars'
													}
												  }
							);

	//checking the response for postCall is 200 or 404 (in case of the car not available) or not
	let postResultCheck = check(postRes, {
											"status is HTTP 200": p => p.status === 200
										 }
							   );


	//if respoonse code is not 200, then increase the error count
	if(!postResultCheck)
	{
		errorCount.add(1);
	}

	sleep(2);
}

export function putCars()
{
	const status = Math.floor(Math.random() * 50) + 1; // returns a random interger from 1 to 50
	var putUrl = 'http://host.docker.internal:8080/api/cars/'+status; // application url
	var payload = JSON.stringify({
  									'model':'XC' + status,
  								 }
  								); // payload to update car model
  
    var params = {
				    headers: 
				    {
				      'Content-Type': 'application/json',
				    },
  				 }; //header needs to be passed in the request

	let putRes = http.put(putUrl, payload, params,{
													tags: 
													{ 
														my_custom_tag: 'putCars'
													}
												  }
						 );

	//checking the response for putCall is 200 or 404 (in case of the car not available) or not
	let putResultCheck = check(putRes, {
											"status is HTTP 200": pt => pt.status === 200 || pt.status === 404 
										}
							  );


	//if respoonse code is not 200, then increase the error count
	if(!putResultCheck)
	{
		errorCount.add(1);
	}

	sleep(2);
}

export function delCars()
{
	const status = Math.floor(Math.random() * 100) + 1; // returns a random interger from 1 to 5
	var putUrl = 'http://host.docker.internal:8080/api/cars/'+status; // application url
    var params = {
				    headers: 
				    {
				      'Content-Type': 'application/json',
				    },
  				 }; //header needs to be passed in the request

	let delRes = http.del(putUrl, params,{
											tags: 
											{ 
												my_custom_tag: 'delCars'
											}
										 }
						 );


	//checking the response for deleteCall is 200 or 404 (in case of the car not available) or not
	let delResultCheck = check(delRes, {
											"status is HTTP 200": d => d.status === 200 || d.status === 404 
									   }
							  );


	//if respoonse code is not 200, then increase the error count
	if(!delResultCheck)
	{
		errorCount.add(1);
	}

	sleep(10);

}
	
