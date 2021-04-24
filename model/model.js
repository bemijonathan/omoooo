const Record = require("../db/db");

class User extends Record {

}

class Wallet extends Record {
    getWalletId(walletId) {
        const records = this.getAllRecords();
        return records.find(e => e.walletId === walletId);
    }

    getWalletByUserId(userId) {
        const records = this.getAllRecords()
        return records.find(e => e.userId === userId);
    }
}

class Transaction extends Record {

    createDebitRecord(...data) {
        return this.createRecord({ ...data })
    }

    createCreditRecord(...data) {
        return this.createRecord({ ...data })
    }

    getUserRecord(id) {
        return this.getRecord(id, "transactions")
    }
}

module.exports = {
    User: new User(),
    Wallet: new Wallet(),
    Transaction: new Transaction()
}