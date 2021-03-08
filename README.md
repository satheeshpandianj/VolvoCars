# VolvoCars
This is related to Volvo Cars CRUD REST application assignment developed using Node JS for performance engineer position

# Pre-requisites:
The application files can be cloned from the git repository located at 
https://github.com/Anandcars/carsmenu

The following components/softwares need to be installed to run the application in your local machine.
1. Node JS
2. Express JS
3. Joi
4. Nodeman

The following softwares need to be installed to run the performance testing and visualize the performance metrics during the test.
1. K6 - Performance testing tool
2. Influx DB
3. Grafana

# Instruction to install the pre-requisite softwares/components (for macOS)

**Install Node JS** :
Install via node-v15.10.0.pkg

**Install Express JS** :
npm install express

**Install Joi** :
npm install Joi

**Install Nodemon** :
npm install nodemon -g

# Run Node JS application in local machine
* Clone the GIT repo to the local machine.
     * This repo has two files
          1. package.json
          2. script.js
* Navigate to this repo in terminal
* Start the application by running the command 
**npm start package.json**
* Open the browser and enter the URL "http://localhost:8080/api/cars" and see the response in json format

# Instruction to install performance testing softwares/components (for macOS)

**Install grafana** :
brew install grafana

**Install Influxdb** :
brew install influxdb

**Install k6** :
brew install k6

# Start service and validate the installation (for macOS)
**1. InfluxDB**
* Navigate the influxdb installation folder and execute influxdb manually. This will start the influxDB service and running in port 8086.
* Open the browser and enter the URL "http://localhost:8086" and see the influxDB screen

**2. Create Datasource in InfluxDB**
* Login into influxDB (Create credential first and then login). 
* Create the datasource with influxDB

**3. Grafana**
* Execute the command ** brew service start grafana** in the terminal and start the service. Grafana will run the port 3000 by default
* Open the browser and enter the URL "http://localhost:3000" and see the grafana screen

**4. Map Grafana with datasource (from InfluxDB)**
* Login into Grafana (admin/admin as credential). 
* Verify the datasource connection.

**5. Create performance testing script using K6**
* Create the test scripts for GET, POST, PUT and DELETE REST API calls for Volvo Cars CRUD REST application

# Execute Performance Testing using K6
* Navigate to the folder where all the scripts are available in the terminal
* Execute the command K6 run --out=influxdb=http://localhost:8086/volvocars scenario.js
    * scenario.js is nothing but the script name
    * volvocars is the database name (It will be automatically created while running the test)     


