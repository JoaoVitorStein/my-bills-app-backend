import Account, { accountFromItem } from "./types";
import * as AccountRepository from "./account-repository";
import uuid from "uuid";

export async function createAccount(account: Account): Promise<Account> {
    account.id = uuid();
    await AccountRepository.save(account);
    return account;
}

export async function getAccountById(id): Promise<Account> {
    const item = await AccountRepository.getById(id);
    return accountFromItem(item.Item);
}

export async function updateAccount(id, account: Account) {
    const key = {
        id: {
            S: id
        }
    };
    const updatedItem = await AccountRepository.update(key, account);
    return accountFromItem(updatedItem.Attributes);
}
