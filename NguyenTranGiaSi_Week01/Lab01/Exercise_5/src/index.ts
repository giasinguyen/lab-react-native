class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(): number {
        return this.balance += 50;
    }

    withdraw(): number {
        return this.balance -= 20;
    }
}

let balance: number = 500;

const account1 = new BankAccount(500);
console.log(`Deposit: ${account1.deposit()}`)
console.log(`Withdraw: ${account1.withdraw()}`)