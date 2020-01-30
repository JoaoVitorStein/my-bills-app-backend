import { createAccount, getAccountById } from "./account-service";
import Account, { AccountType } from "./types";
import * as AccountRepository from "./account-repository";
import uuid from "uuid";

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

    it("should return a account", async () => {
        const getByIdSpy = jest.spyOn(AccountRepository, "getById");
        const id = uuid();
        const account: Account = {
            id: id,
            name: "test",
            type: AccountType.CARD,
            userId: "123",
            initialBalance: 0,
            currentBalance: 0
        };
        const dynamoResponse = {
            Item: {
                id: {
                    S: account.id
                },
                initialBalance: {
                    N: account.initialBalance.toString()
                },
                name: {
                    S: account.name
                },
                userId: {
                    S: account.userId
                },
                currentBalance: {
                    N: account.currentBalance.toString()
                },
                type: {
                    S: account.type.toString()
                }
            }
        };
        getByIdSpy.mockReturnValue(Promise.resolve(dynamoResponse));

        const result = await getAccountById(id);
        expect(result).toMatchObject(account);
        expect(AccountRepository.getById).toBeCalledWith(id);
    });
});
