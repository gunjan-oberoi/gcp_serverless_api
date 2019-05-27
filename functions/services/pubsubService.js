const CONSTANTS = require('../util/constants')
const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub();


async function publishMessage(message){
    const data = JSON.stringify(message);
    const dataBuffer = Buffer.from(data);
    const messageId = await pubsub.topic(CONSTANTS.TOPIC_NAME).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}

module.exports = {
    publishMessage
}