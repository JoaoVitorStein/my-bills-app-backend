import dotenv from "dotenv";

dotenv.config();


const CONFIGURATION = {
  dynamoDBRegion: process.env.DYNAMO_DB_REGION,
  AWSAcessKey: process.env.AWS_ACCESS_KEY,
  AWSSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

export default CONFIGURATION;
