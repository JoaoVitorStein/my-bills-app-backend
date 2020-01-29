import { createAccount } from "../account-service";
import Account, { AccountType } from "../types";
import * as AccountRepository from "../account-repository";

describe("account-service", () => {
    it("should create account", () => {
        spyOn(AccountRepository, "save");

        const account: Account = {
            name: "test",
            type: AccountType.CARD,
            userId: "123",
            initialBalance: 0,
            currentBalance: 0
        };

        createAccount(account);
        expect(AccountRepository.save).toBeCalledWith(account);
    });
});
