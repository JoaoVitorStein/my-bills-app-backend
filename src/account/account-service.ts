import Account, { toItem } from "./account-dto";
import * as AccountRepository from "./account-repository";
import HttpError from "@exceptions/http-error";
import AccountType from "./account-type";

export async function createAccount(account: Account) {
    if (!account.userId) {
        throw new HttpError(400, "userId is a mandatory information");
    }
    if (!account.type || !(account.type in AccountType)) {
        throw new HttpError(400, "type is a mandatory information");
    }
    if (!account.name) {
        throw new HttpError(400, "name is a mandatory information");
    }
    return AccountRepository.save(toItem(account));
}
