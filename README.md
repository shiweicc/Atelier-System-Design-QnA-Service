# Atelier Retail Q&A | Back-end services for e-commerce site
I worked with another two software engineers to rebuild the back-end API service from a monolithic to service-oriented microservices to support our existing e-commerce application in this project. The service I built was scaled to meet the demands of production traffic, which is 5000rps with < 1s response time with a 0% error rate. 

## Technologies used

**Backend Development**:  Node.js, Express, Postgres, NGINX
</br>
**Deployment**: AWS EC2, AWS Images
</br>
**Testing**: Jest, SuperTest, K6, Loader.io, New Relic


## Table of Contents
  - <a href='#system-design'>System Design</a>
  - <a href='#usage'>Usage</a>
  - <a href='#db-initialization-and-etl-quaries-in-postgres'>DB Initialization and ETL Quaries in Postgres</a>
  - <a href='#installation'>Installation</a>

## System Design
  ### Database Design
  <img width="698" alt="Phase 1 - SQL schema updated after realdata" src="https://user-images.githubusercontent.com/61093624/201395774-3b78bad7-ad64-437a-960a-773acbd51eb5.png">

  ### Architecture
<img width="651" alt="Screenshot 2022-11-11 at 2 58 30 PM" src="https://user-images.githubusercontent.com/61093624/201429705-cc53e8cb-9110-4f49-b84b-ef5f58439a08.png">
  
  ### Stress Test Results via Loader.io
<img width="874" alt="image" src="https://user-images.githubusercontent.com/61093624/201408430-d8d5e220-bc5d-465c-960a-ee8f079ec3e2.png">
<img width="888" alt="image (1)" src="https://user-images.githubusercontent.com/61093624/201408489-f59c9db2-c492-4d83-868e-67c66d207bd1.png">


## Usage


## Installation
1. Fork the project and clone to your local repository
2. Start server:
  ```npm start ```
3. Run tests:
  ```npm run test ```
