/*
Author: Satheesh Pandian
Date : 04-03-2021
Script name: PutCars.js
Description: This script does the following
       1. putCall updates the model of the given id passed in the url
*/

//importing the mandatory modules to run the script
import http from 'k6/http';
import {sleep} from 'k6';

/* 
  workload scenario with the following load
  getCars: 1 user and execute for 60 seconds
*/

export let options = {
	vus:1,
	duration: '60s',
};

//making putCall
export default function () {
  
  var url = 'http://localhost:8080/api/cars/'+ __ITER; // application url along with id of the car
  
  // payload to update car model
  var payload = JSON.stringify({
  	'model':'XC' + __ITER,
  });
  
  //header needs to be passed in the request
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.put(url, payload, params);
  
  sleep(10); // wait for 10 seconds before starting next call
}
