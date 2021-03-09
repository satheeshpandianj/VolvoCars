
/*
Author: Satheesh Pandian
Date : 04-03-2021
Script name: Delete.js
Description: This script does the following
       1. deleteCall deletes the car details of the given id passed in the url
*/

//importing the mandatory modules to run the script
import http from 'k6/http';
import {sleep} from 'k6';

/* 
  workload scenario with the following load
  deleteCars: 1 user and execute for 60 seconds
*/

export let options = {
	vus:1,
	duration: '60s',
};

//making deleteCall
export default function () {
  	
  //var url = 'http://localhost:8080/api/cars/';
  
  //header needs to be passed in the request
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

    for (var id = 0; id <= 24; id++) {
    	http.del(`http://localhost:8080/api/cars/${id}`, params);
	}

  
  
  sleep(10); // wait for 10 seconds before starting next call
}
