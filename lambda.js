const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();
const dbTableName = 'CC_Storage_Unit';

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';

    try {
        switch (event.httpMethod) {
            case 'GET':
                body = await getCards();
                break;
            case 'POST':
                body = await addCard(JSON.parse(event.body));
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    }

    return buildResponse(statusCode, body);
};

async function addCard(requestBody) {
    const params = {
        TableName: dbTableName,
        Item: requestBody
    }
    return await db.put(params).promise().then(() => {
        const body = {
            Operation: 'Adding Card to DB',
            Message: 'SUCCESS! Card added to DB.'
        }
        return body;
    }, (error) => {
        console.error('Error: could not addCard() to DynamoDB: ', error);
    })
}

async function getCards() {
    const params = {
        TableName: dbTableName,
    }
    return await db.scan(params).promise().then((allCards) => {
        const body = {
            Operation: 'Getting all Cards from DB',
            Message: 'SUCCESS! Card added to DB.',
            Cards: allCards.Items
        }
        return body;
    }, (error) => {
        console.error('Error: could not addCard() to DynamoDB: ', error);
    })
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://automaticom.cloud",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

