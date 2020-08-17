const { DynamoDB } = require('aws-sdk');
const dynamodb = new DynamoDB();

exports.handler = async ({ id, input, output }) => {
    const params = {
        Item: {
            'requestId': {
                S: id,
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
    await dynamodb.putItem(params).promise();
    return;
};