/*
Author: Satheesh Pandian
Date : 05-03-2021
Script name: CloudScript.js
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
  ext: {
    loadimpact: {
      name: 'K6Cloud!',
      projectID: 3528198,
    },
  },
  vus: 20,
  duration: '180s',
};

	//making getCall
export default function () 
{
	const status = Math.floor(Math.random() * 3) + 1; // returns a random interger from 1 to 3
	//console.log(status);

	var url = 'http://localhost:8080/api/cars/'+status; // application url
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



	
