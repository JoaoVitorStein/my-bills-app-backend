import { createItem } from "@dynamo-db/dynamo-db-operations";
import accountTable from "@tables/account-table.json";

export async function save(account) {
    return createItem(accountTable.TableName, account);
}
