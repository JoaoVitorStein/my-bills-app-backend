import Client from "./dynamo-db-client";

function getDynamoDbValue(value) {
    if (value instanceof Date) {
        return {
            S: value.toISOString()
        };
    } else if (typeof value === "string") {
        return {
            S: value
        };
    } else if (typeof value === "number") {
        return {
            N: value ? value.toString() : "0"
        };
    } else if (typeof value === "boolean") {
        return {
            BOOL: value
        };
    }
}

function toItem(dto) {
    const item = {};
    Object.keys(dto).forEach(key => {
        item[key] = getDynamoDbValue(dto[key]);
    });
    return item;
}

function mountUpdate(dto) {
    const updateFields = [];
    const attributeMap = {};
    const attributeValues = {};
    Object.keys(dto).forEach(key => {
        if (dto[key]) {
            updateFields.push(`#${key} = :${key}`);
            attributeValues[`:${key}`] = getDynamoDbValue(dto[key]);
            attributeMap[`#${key}`] = key;
        }
    });
    const updateExpression = `set ${updateFields.join(", ")}`;
    return {
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: attributeValues,
        ExpressionAttributeNames: attributeMap
    };
}

export async function createItem(tableName: string, item) {
    return Client.putItem({
        TableName: tableName,
        Item: toItem(item)
    }).promise();
}

export async function getItem(params) {
    return Client.getItem(params).promise();
}

export async function updateItem(table, key, item) {
    return Client.updateItem({
        TableName: table,
        Key: key,
        ReturnValues: "ALL_NEW",
        ...mountUpdate(item)
    }).promise();
}
