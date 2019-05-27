# GCP SERVERLESS Proof-Of-Concept

GCP offers and supports serverless compute platform via Cloud functions. 
The application utilises these capabilities to build a RESTful microservice **Store API** with individual, autonomous **Cloud Functions**. Store API performs CRUD operations on **Cloud Firestore** database; and publish messages to **PUB/SUB** and emit Events. PUB/SUB Subscribers responds to the events.

## Flow Diagram 
Below GCP services are used to accomplish the serverless application.
1. Cloud Function, Function as a service(FAAS)
1. Firestore (No SQL database)
1. Pub/Sub (Asyn message queue)

![Serverless App Architecture](https://github.com/hjadon27/Designs/blob/master/gcp_serverless.png)


###### Store API
Store API enables to GET, POST, PUT and DELETE Store.
1. POST Store
   - create new store *https://us-central1-gcp-serverless-240708.cloudfunctions.net/serverless/api/v1/stores*
   >  - Request body:
     ```{
               "name": "Newyork, Timesqare Gems Store",
               "zip": 139445,
               "status": "ACTIVE",
               "timings":  "11AM - 10PM",
               "email": "harendra.kumar@hcl.com"
            }
      ```
   >  - Response:
      ```
        {
             "statusCode": 200,
             "responseObject": {
                 "storeId": "xmtUgMM4Ciu4XinQgEpr",
                 "store": {
                     "name": "Newyork, Timesqare Gems Store",
                     "zip": 139445,
                     "status": "ACTIVE",
                     "timings":  "11AM - 10PM",
                     "email": "harendra.kumar@hcl.com"
                 }
             }
         }
      ```
   >  - Inserts data into the Cloud Firestore Collection **__stores__** and generate a storeId.
   >  - Publishes a message on PUB/SUB topic **__store-msg-queue__** as **New Store Created**
   >  - The topic message is subscribed by a cloud function and send email notification.
   
2. GET Stores
   - get all stores from firestore *https://us-central1-gcp-serverless-240708.cloudfunctions.net/serverless/api/v1/stores*
   > - Response:
   ```
      {
             "statusCode": 200,
             "responseObject": [
                 {
                     "id": "L9pqIzc55673vI5YsWu6",
                     "storeObject": {
                         "zip": 139445,
                         "timings": "11AM - 10PM",
                         "status": "INACTIVE",
                         "email": "harendra.kumar@hcl.com",
                         "name": "Delhi Shop 009"
                     }
                 },
                 {
                     "id": "xmtUgMM4Ciu4XinQgEpr",
                     "storeObject": {
                         "timings": "11AM - 10PM",
                         "status": "INACTIVE",
                         "email": "harendra.kumar@hcl.com",
                         "name": "Newyork, Timesqare Gems Store",
                         "zip": 139445
                     }
                 }
             ]
         }
   ```
   - get store by id from firestore *https://us-central1-gcp-serverless-240708.cloudfunctions.net/serverless/api/v1/stores/xmtUgMM4Ciu4XinQgEpr*
   > - Response:
   ```
      {
          "statusCode": 200,
          "responseObject": {
              "id": "xmtUgMM4Ciu4XinQgEpr",
              "storeObject": {
                  "zip": 139445,
                  "timings": "11AM - 10PM",
                  "status": "INACTIVE",
                  "email": "harendra.kumar@hcl.com",
                  "name": "Newyork, Timesqare Gems Store"
              }
          }
      }
   ```

3. PUT Store
   - update store by id *https://us-central1-gcp-serverless-240708.cloudfunctions.net/serverless/api/v1/stores/xmtUgMM4Ciu4XinQgEpr*
   > - Request body:
   ```
        {
                "zip": 139445,
                "timings": "11AM - 10PM",
                "status": "INACTIVE",
                "email": "harendra.kumar@hcl.com",
                "name": "Newyork, Timesqare Gems Store"
         }
    ```
    > - Response:
   ```
      {
             "statusCode": 200,
             "responseObject": {
                 "storeId": "xmtUgMM4Ciu4XinQgEpr",
                 "store": {
                     "zip": 139445,
                     "timings": "11AM - 10PM",
                     "status": "INACTIVE",
                     "email": "harendra.kumar@hcl.com",
                     "name": "Newyork, Timesqare Gems Store"
                 }
             }
        }
   ```
   
4. DELETE Store
   - delete store by id *https://us-central1-gcp-serverless-240708.cloudfunctions.net/serverless/api/v1/stores/qx6VjyBgK7nWjup8JDpZ*
   > - Response:
   ```
      {
          "statusCode": 200,
          "responseObject": {
              "message": "The store with storeId qx6VjyBgK7nWjup8JDpZ deleted."
          }
      }
   ```
   >  - deletes data from the Cloud Firestore Collection **__stores__**
   >  - publishes a message on PUB/SUB topic **__store-msg-queue__** as **Delete Store Id**

###### Cloud Firestore
A collection named **__stores__** contains documents for *STORE* 
``` javascript
{
  name: "Delhi shop 007",
  status: "ACTIVE",
  timings: "9AM - 10PM",
  zip: 123455,
  email: poc_1234@gmail.com
}

```

###### PUB/SUB
Topic **__store-msg-queue__** emits Events and subscribers PUSH / PULL messages and responds to events
1. PUSH subscriber as Cloud Function - send an email notification
2. PULL subscriber
