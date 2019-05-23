# PJI - GCP SERVERLESS Proof-Of-Concept

GCP offers and supports serverless compute platform via Cloud functions. 
The application utilises these capabilities to build a RESTful microservice **Store API** with individual, autonomous **Cloud Functions**. Store API performs CRUD operations on **Cloud Firestore** database; and publish messages to **PUB/SUB** and emit Events. PUB/SUB Subscribers responds to the events.

## Flow Diagram 
Below GCP services are used to accomplish the serverless application.
1. Cloud Function, Function as a service(FAAS)
1. Firestore (No SQL database)
1. Pub/Sub (Asyn message queue)

![Serverless App Architecture](https://github.com/hjadon27/PJI_Serverless_Functions/blob/dev/flow.png)


###### Store API
Store API enables to GET, POST, PUT and DELETE Store.
1. GET Stores
   - get all stores *https://us-central1-gcp-serverless-240708.cloudfunctions.net/pji/api/v1/stores*
   - get store by id *https://us-central1-gcp-serverless-240708.cloudfunctions.net/pji/api/v1/stores/001*
   > - reads data from the Cloud Firestore Collection **__stores__**
   
2. POST Store
   - create new store *https://us-central1-gcp-serverless-240708.cloudfunctions.net/pji/api/v1/stores*
   >  - inserts data into the Cloud Firestore Collection **__stores__**
   >  - publishes a message on PUB/SUB topic **__store-msg-queue__** as **New Store Created**
   
3. PUT Store
   - update store by id *https://us-central1-gcp-serverless-240708.cloudfunctions.net/pji/api/v1/stores/001*
   >  - updates data into the Cloud Firestore Collection **__stores__**
   >  - publishes a message on PUB/SUB topic **__store-msg-queue__** as **Update Store Id**
   
4. DELETE Store
   - delete store by id *https://us-central1-gcp-serverless-240708.cloudfunctions.net/pji/api/v1/stores/001*
   >  - deletes data from the Cloud Firestore Collection **__stores__**
   >  - publishes a message on PUB/SUB topic **__store-msg-queue__** as **Delete Store Id**

###### Cloud Firestore
A collection named **__stores__** contains documents for *STORE* 
``` javascript
{
  id: "003",
  name: "London PAPA",
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

:+1:
