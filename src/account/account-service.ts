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
