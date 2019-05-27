const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./util/api_docs/swagger.json');
const router = express.Router();
const storeService = require('./services/storeService');
const mailService = require('./services/mailService')
const CONSTANTS = require('./util/constants');

//Router for store create and get all stores
router.route('/stores').post(storeService.createStore)
                    .get(storeService.getAllStores);

//Router for get, update or delete store by store ID                    
router.route('/stores/:storeId').put(storeService.updateStore)
                    .get(storeService.getStoreById)
                    .delete(storeService.deleteStore);

const storeApi = express();

//Swagger configuration
storeApi.use(CONSTANTS.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
storeApi.use(cors({origin: true}));

//Setting the router to the express with baseurl and api version
storeApi.use(CONSTANTS.BASE_URL+CONSTANTS.VERSION, router);

//Exporting the service as cloud functions with http event
exports.pji = functions.https.onRequest(storeApi);

/**
 * To send mail notification
 */
exports.storeTopicSubscriber = functions.pubsub.topic(CONSTANTS.TOPIC_NAME).onPublish(
    (message) => {
        mailService.sendMail(message.data);
      } 
);
