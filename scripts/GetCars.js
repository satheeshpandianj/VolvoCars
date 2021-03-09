/*
Author: Satheesh Pandian
Date : 04-03-2021
Script name: GetCars.js
Description: This script does the following
			 1. getCall retrieves all the cars details like id and model
*/

//importing the mandatory modules to run the script
import http from 'k6/http';
import { sleep } from 'k6';

/* 
	workload scenario with the following load
	getCars: 20 users and execute for 60 seconds
*/
export let options = {
	vus: 20,
	duration: '60s',
};

//making getCall
export default function () {
  http.get('http://localhost:8080/api/cars/');
  sleep(1); // wait for 1 second before starting next call
}
