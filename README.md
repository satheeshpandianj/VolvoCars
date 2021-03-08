# VolvoCars
This is related to performance testing approach on Volvo Cars CRUD REST application developed using Node JS

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
2. Influx DB - To store the performance metrics
3. Grafana - To visualize the performance metrics

# Instruction to install the pre-requisite softwares/components (for macOS)

**Install Node JS** :
Install via node-v15.10.0.pkg

**Install Express JS** :
npm install express

**Install Joi** :
npm install Joi

**Install Nodemon** :
npm install nodemon -g

# Task No 1: 

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
* Navigate to the influxdb installation folder and execute influxdb manually. This will start the influxDB service and will be running in port 8086.
* Open the browser and enter the URL "http://localhost:8086" and see the influxDB screen.

**2. Create Datasource in InfluxDB**
* Login into influxDB (Create credentials first and then login). 
* Create the datasource with influxDB.

**3. Grafana**
* Execute the command ** brew service start grafana** in the terminal to start the service. Grafana will run in the port 3000 by default.
* Open the browser and enter the URL "http://localhost:3000" and see the grafana screen.

**4. Map Grafana with datasource (from InfluxDB)**
* Login into Grafana (admin/admin as credentials). 
* Verify the datasource connection.


# Execute Performance Testing using K6
# Task No 2: 
* Create the test scripts for GET, POST, PUT and DELETE REST API calls for Volvo Cars CRUD REST application. Refer scripts folder for scripts 

# Task No 3a: This test executes in local machine
* Navigate to the folder where all the scripts are available in the terminal
* Execute the command K6 run --out=influxdb=http://localhost:8086/volvocars scenario.js
    * scenario.js is nothing but the script name
    * volvocars is the database name (It will be automatically created while running the test)     

# Task No 3b: This test executes in docker
* Docker needs to be installed to run the test in docker. Docker.img can be found here [https://docs.docker.com/docker-for-mac/install/]
* Navigate to the folder where docker-compose.yml file is available in the terminal
* Execute the docker commands
    * docker-compose up -d influxdb grafana
      * The above command pull the docker images for influxDB and grafana and run them in detached mode
    * docker-compose run -v [ScriptPath]:/scripts k6 run [ScriptPath]/script.js
      * The above command will start the test in docker and send the metrics to InfluxDB and Grafana will load the metrics visually.

