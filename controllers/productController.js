let AWS = require('./db_config/dbConfig');

const dynamoDB = new AWS.AWS.DynamoDB.DocumentClient();
const dynamoDBTableName = process.env.DB_NAME;

const getOneProduct = async(req, res) => {
    let params = {
        TableName: dynamoDBTableName,
        Key: {
            'product_id': req.query.product_id,
        }
    }

    await dynamoDB.get(params)
        .promise()
        .then(re => {
            res.json(re.Item);
        })
        .catch(err => {
            res.status(500).json("Server Error: ", err);
        })
}

const getAllProduct = async(req, res) => {
    let params = {
        TableName: dynamoDBTableName
    };

    try {
        let allProducts = await scanDynamoRecords(params, []);
        let body = {
            products: allProducts
        }
        res.json(body);
    } catch (err) {
        res.status(500).json("Server Error: ", err);
    }
}

async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getOneProduct,
    getAllProduct
}