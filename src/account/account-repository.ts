import {
    createItem,
    getItem,
    updateItem
} from "@dynamo-db/dynamo-db-operations";
import accountTable from "@tables/account-table.json";

export async function save(account) {
    return createItem(accountTable.TableName, account);
}

export async function getById(id: string) {
    const params = {
        TableName: accountTable.TableName,
        Key: {
            id: {
                S: id
            }
        }
    };
    return getItem(params);
}

export async function update(key, account) {
    return updateItem(accountTable.TableName, key, account);
}
