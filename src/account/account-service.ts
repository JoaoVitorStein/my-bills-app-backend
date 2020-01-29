import Account from "./types";
import * as AccountRepository from "./account-repository";
import uuid from "uuid";

export async function createAccount(account: Account): Promise<Account> {
    account.id = uuid();
    await AccountRepository.save(account);
    return account;
}
