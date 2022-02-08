# Description

This repo conatins the demo code of the "Sales - Invoices - HR" system integration use case.
These three systems are developed as node.js applications and can be found beneath `endpoint1`,`endpoint2`, and `endpoint3` respectively.

# Execution

First, make sure that you have a recent version of _Node_ and _NPM_ installed.
After the first checkout, you have to download the NPM dependencies by running.
```
(cd endpoint1/;npm install) & (cd endpoint2/;npm install) & (cd endpoint3/;npm install) 
```
When, NPM dependencies are downloaded, you can run all endpoints simultaneously by running:
```
(cd endpoint1/;npm run start) & (cd endpoint2/;npm run start) & (cd endpoint3/;npm run start) 
```
Afterwards, the three systems are accessible as GraphQL endpoints under the respective urls:
(http://localhost:4011), (http://localhost:4012), and (http://localhost:4013).
You can use you browser to navigate there and play around with the data.