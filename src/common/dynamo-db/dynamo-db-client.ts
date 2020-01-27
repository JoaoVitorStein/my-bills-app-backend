import AWS from "aws-sdk";
import CONFIGURATION from "../config";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";

const dynamoDbOptions: ClientConfiguration = {
    region: CONFIGURATION.dynamoDBRegion,
    accessKeyId: CONFIGURATION.AWSAcessKey,
    secretAccessKey: CONFIGURATION.AWSSecretAccessKey
};

const Client = new AWS.DynamoDB(dynamoDbOptions);

export default Client;
