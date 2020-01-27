import AccountType from "./account-type";
import uuid from "uuid";

interface Account {
    id: string;
    type: AccountType;
    name: string;
    initialBalance: number;
    currentBalance: number;
    userId: string;
}

export function fromItem(document): Account {
    return document;
}

export function toItem(account: Account) {
    return {
        id: {
            S: uuid()
        },
        userId: {
            S: account.userId
        },
        name: {
            S: account.name
        },
        initialBalance: {
            N: (account.initialBalance || 0).toString()
        },
        currentBalance: {
            N: (account.currentBalance || 0).toString()
        },
        type: {
            S: account.type
        }
    };
}

export default Account;
