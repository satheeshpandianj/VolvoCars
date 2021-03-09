/*
Author: Satheesh Pandian
Date : 04-03-2021
Script name: PostCars.js
Description: This script does the following
       1. postCall creates an id and model for the new car. The payload should have model with atleast 3 characters
 */

//importing the mandatory modules to run the script
import http from 'k6/http';
import {sleep} from 'k6';

/* 
  workload scenario with the following load
  postCars: 10 users and execute for 300 seconds
*/

export let options = {
	vus:10,
	duration: '300s',
};

//making postCall
export default function () {
  
  // application url
  var url = 'http://localhost:8080/api/cars/';
  
  // payload to create new car
  var payload = JSON.stringify({
  	'model':'XC' + __ITER,
  });
  
  //header needs to be passed in the request
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params); 
  
  sleep(1); // wait for 1 second before starting next call
}
