
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

const store_collection = 'stores';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function saveStore(req, res){
    // Enter new data into the document.
    db.collection(store_collection).doc(req.body.id).set(req.body)
    .then(()=>{
        // Document created successfully.
        var response = {
            statusCode: 200,
            responseObject: req.body
        }
        res.send(response)
    }).catch(error=>{
        console.log(error)
        res.send(error);
    });
}

function removeStore(req, res){
    // db.collection(store_collection).doc(req.)
}

function fetchStoreById(req, res){
    db.collection(store_collection).doc(req.params.storeId).get().then((snapshot)=>{
        const store = snapshot.data();
        var response = {
            statusCode: 200,
            responseObject: store
        }
        res.send(response);
    }).catch((error)=>{
        console.log(error);
    });
}

function updateStores(req, res){
    
}

function fetchAllStores(req, res){
    db.collection(store_collection).get().then((snapshot)=>{
        const stores = [];
        snapshot.forEach((doc) => {
          stores.push(doc.data());
        });
        var response = {
            statusCode: 200,
            responseObject: stores
        }                                               
        res.send(response);
    }).catch(error=>{
            console.log(error);
            res.send(error);
    });
    
}

module.exports = {
    saveStore,
    fetchAllStores,
    fetchStoreById
}