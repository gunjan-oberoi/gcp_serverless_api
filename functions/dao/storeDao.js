
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

const store_collection = 'stores';

/**
 * To create a store in firestore collection
 * @param {*} req 
 */
async function saveStore(req){
    var snapshot = await db.collection(store_collection).add(req.body)
    .catch(error=>{
        console.log(error)
    });
    var response = {
        statusCode: 200,
        responseObject: { storeId: snapshot.id,
                            store: req.body}
    }
    return response;
}

/**
 * To fetch all the stores from firestore collection
 */
async function fetchAllStores(){
    var snapshot = await db.collection(store_collection).get().catch(error=>{
            console.log(error);
    });
    const stores = [];
        snapshot.forEach((doc) => {
          stores.push({id: doc.id,
                        storeObject: doc.data()});
        });
        var response = {
            statusCode: 200,
            responseObject: stores
        }                                               
        return response;
}

/**
 * To get a store from firestore collection
 * @param {*} req 
 * @param {*} res 
 */
async function fetchStoreById(req){
    var snapshot = await db.collection(store_collection).doc(req.params.storeId).get().catch((error)=>{
        console.log(error);
    });
        const store = {id: snapshot.id,
            storeObject: snapshot.data()};
        var response = {
            statusCode: 200,
            responseObject: store
        }
        return response;
}

/**
 * To do update in firestore stores collection
 * @param {*} req 
 * @param {*} res 
 */
async function updateStore(req){
    await db.collection(store_collection).doc(req.params.storeId).set(req.body)
    .catch(error=>{
        console.log(error)
    });
    var response = {
        statusCode: 200,
        responseObject: { storeId: req.params.storeId,
            store: req.body}
    }
    return response;
}

/**
 * To delete a store from firestore collection
 * @param {*} req 
 */
async function removeStore(req){
    await db.collection(store_collection).doc(req.params.storeId).delete().catch((error)=>{
        console.log(error);
    });
    var response = {
        statusCode: 200,
        responseObject: {message : `The store with storeId ${req.params.storeId} deleted.`}
    }
    return response;
}

module.exports = {
    saveStore,
    fetchAllStores,
    fetchStoreById,
    updateStore,
    removeStore
}