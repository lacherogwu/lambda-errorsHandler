const DynamoDB = require('aws-sdk/clients/dynamodb');
const dynamodb = new DynamoDB();

exports.handler = async ({ id, url, functionName, input, output }) => {
    const params = {
        Item: {
            'requestId': {
                S: id,
            },
            'url': {
                S: url || '',
            },
            'functionName':{
                S: functionName
            },
            'input': {
                S: JSON.stringify(input)
            },
            'output': {
                S: JSON.stringify(output)
            },
            'createdAt': {
                N: `${new Date().getTime()}`
            }
        },
        TableName: 'MiniZapier'
    };
    return await dynamodb.putItem(params).promise();
};