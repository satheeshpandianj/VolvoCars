/*
Author: Satheesh Pandian
Date : 03-03-2021
Script name: StepUpScript.js
Description: This script does the following
			 1. getCall retrieves all the cars details like id and model
			 2. postCall creates an id and model for the new car. The payload should have model with atleast 3 characters
			 3. putCall updates the model of the given id passed in the url
			 4. deleteCall deletes the car details of the given id passed in the url
*/

//importing the mandatory modules to run the script
import http from "k6/http";
import { check, sleep, fail, group } from "k6";
import { Counter, Rate } from "k6/metrics";


let errorCount = new Counter("errors"); // variable to count the errors
//let errorRate = new Counter("error_rate"); // variable to count the errors


/*
The following options defines the ramp up pattern for each stage (step up testing) and its duration for each stage
*/


export let options = {
	stages: [
		{ duration: '10s', target: 10},
		{ duration: '20s', target: 15},
		{ duration: '30s', target: 20},
		{ duration: '40s', target: 25},
		{ duration: '10s', target: 0},
	],
	thresholds:{
		http_req_duration: ['p(95)<500', 'p(99)<1500'],
		//errorRate: ["rate < 0.1"]
	}
};

	//making getCall
export default function () 
{
	const status = Math.floor(Math.random() * 3) + 1; // returns a random interger from 1 to 3
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



	
