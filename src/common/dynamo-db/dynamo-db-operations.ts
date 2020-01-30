import Client from "./dynamo-db-client";
import { PutItemOutput, GetItemOutput } from "aws-sdk/clients/dynamodb";

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

export async function createItem(
    tableName: string,
    item
): Promise<PutItemOutput> {
    return Client.putItem({
        TableName: tableName,
        Item: toItem(item)
    }).promise();
}

export async function getItem(params): Promise<GetItemOutput> {
    return Client.getItem(params).promise();
}
