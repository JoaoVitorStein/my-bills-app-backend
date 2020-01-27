import Client from "./dynamo-db-client";
import {
    PutItemOutput,
    PutItemInputAttributeMap
} from "aws-sdk/clients/dynamodb";

export async function createItem(
    tableName: string,
    item: PutItemInputAttributeMap
): Promise<PutItemOutput> {
    return Client.putItem({ TableName: tableName, Item: item }).promise();
}
