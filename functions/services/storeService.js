const storeDao = require('../dao/storeDao');
const pubSubService = require('../services/pubsubService');

/**
 * To create a new store
 * @param {*} req 
 * @param {*} res 
 */
function createStore(req, res){
    storeDao.saveStore(req, res);
};

/**
 * To get all stores
 * @param {*} req 
 * @param {*} res 
 */
function getAllStores(req, res){
    storeDao.fetchAllStores(req, res);
}

/**
 * To update a store details
 * @param {*} req 
 * @param {*} res 
 */
function updateStore(req, res){
    storeDao.updateStores(req, res);
}
 
/**
 * To get store details by store Id
 * @param {*} req 
 * @param {*} res 
 */
async function getStoreById(req, res){
    var response = await storeDao.fetchStoreById(req, res);
    pubSubService.publishMessage(response);
    res.send(response);
}
   
/**
 * To delete a store by Id
 * @param {*} req 
 * @param {*} res 
 */
function deleteStore(req, res){
    storeDao.removeStore(req,res);
}

module.exports = {
    createStore,
    getAllStores,
    updateStore,
    getStoreById,
    deleteStore
}