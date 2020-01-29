export interface Account {
    id?: string;
    type: AccountType;
    name: string;
    initialBalance: number;
    currentBalance: number;
    userId: string;
}

export enum AccountType {
    WALLET = "WALLET",
    BANK = "BANK",
    SAVINGS = "SAVINGS",
    CARD = "CARD"
}

export function accountFromItem(document): Account {
    return {
        id: document.id.S,
        type: document.type.S,
        name: document.name.S,
        initialBalance: document.initialBalance.N,
        currentBalance: document.currentBalance.N,
        userId: document.userId.S
    };
}

export default Account;
