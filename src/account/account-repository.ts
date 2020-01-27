import { createItem } from "@dynamo-db/dynamo-db-operations";
import accountTable from "@tables/account-table.json";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";

export async function save(account: PutItemInputAttributeMap) {
    return createItem(accountTable.TableName, account);
}
