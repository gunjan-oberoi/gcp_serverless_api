const storeDao = require('../dao/storeDao');
const pubSubService = require('../services/pubsubService');

/**
 * To create a new store
 * @param {*} req 
 * @param {*} res 
 */
async function createStore(req, res){
    var response = await storeDao.saveStore(req);
    pubSubService.publishMessage(response);
    res.send(response);
};

/**
 * To get all stores
 * @param {*} req 
 * @param {*} res 
 */
async function getAllStores(req, res){
    var response = await storeDao.fetchAllStores();
    res.send(response);
}

/**
 * To get store details by store Id
 * @param {*} req 
 * @param {*} res 
 */
async function getStoreById(req, res){
    var response = await storeDao.fetchStoreById(req);
    res.send(response);
}

/**
 * To update a store details
 * @param {*} req 
 * @param {*} res 
 */
async function updateStore(req, res){
    var response = await storeDao.updateStore(req);
    res.send(response);
}
 
/**
 * To delete a store by Id
 * @param {*} req 
 * @param {*} res 
 */
async function deleteStore(req, res){
    var response = await storeDao.removeStore(req);
    res.send(response);
}

module.exports = {
    createStore,
    getAllStores,
    updateStore,
    getStoreById,
    deleteStore
}