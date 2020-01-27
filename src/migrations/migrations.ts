import Client from "@dynamo-db/dynamo-db-client";
import accountTable from "./specs/account-table.json";

export default [
    () => {
        console.log("Creating account table");
        return Client.createTable(accountTable).promise();
    }
];
