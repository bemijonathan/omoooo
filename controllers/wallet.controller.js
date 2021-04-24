const { User, Wallet, Transaction } = require("../model/model");

class WalletController {
    #user = User;
    #wallet = Wallet;

    transferFunds = (req, res) => {
        const { recieverWallet, amount } = req.body;
        const recieverWalletDetails = this.#wallet.getWalletId(recieverWallet);
        if (!recieverWalletDetails) {
            return res.status(404).send({
                status: false,
                message: "wallet not found"
            })
        }
        const succ = this.withdrawUserWallet(req, res);
        if (!succ) {
            return res.status(400).send({
                status: false,
                message: "unsuccessfull transaction"
            })
        }
        this.#wallet.updateRecord(recieverWalletDetails.id, {
            ...recieverWalletDetails,
            balance: amount + recieverWalletDetails.balance
        })
        return res.status(200).send({
            status: true,
            message: "successfull deposit"
        })
    }

    getWallet = (req, res) => {
        const id = req.user.id
        const wallet = this.#wallet.getWalletByUserId(id);
        return res.status(200).send({
            status: true,
            message: "successfull",
            data: wallet
        })
    }

    deposit = (req, res) => {
        const success = this.depositUserWallet(req)
        if (!success) {
            return res.status(400).send({
                status: false,
                error: "transaction unsuccessful"
            })
        }
        return res.status(200).send({
            status: true,
            message: "successfull deposit"
        })
    }


    withDrawal = (req, res) => {
        const succ = this.withdrawUserWallet(req, res)
        if (!succ) {
            return res.status(400).send({
                status: false,
                error: "withdrawal failed"
            })
        }
        // create withdrawal transaction here 
        return res.status(200).send({
            status: true,
            message: "successfull withdrawal"
        })
    }

    depositUserWallet(req, res) {
        const userId = req.user.id;
        const { walletId, amount, narration, from } = req.body;
        const wallet = this.#wallet.getWalletId(walletId);
        if (!wallet) {
            return res.status(404).send({
                status: false,
                error: "wallet not found"
            })
        }
        if (wallet.userId !== userId) {
            return res.status(400).send({
                status: false,
                error: "wallet does not belong to you"
            })
        }
        if (0 > amount) {
            return res.status(400).send({
                status: false,
                error: "Price cannot be lower than 0.00"
            })
        }
        this.#wallet.updateRecord(wallet.id, {
            ...wallet,
            balance: amount + wallet.balance
        })
        //create a deposit transaction 
        return true
    }

    withdrawUserWallet(req, res) {
        const userId = req.user.id;
        const { walletId, amount, narration } = req.body;
        const wallet = this.#wallet.getWalletId(walletId);
        if (!wallet) {
            return res.status(404).send({
                status: false,
                error: "wallet not found"
            })
        }
        if (wallet.userId !== userId) {
            return res.status(400).send({
                status: false,
                error: "wallet does not belong to you"
            })
        }
        if (0 > amount) {
            return res.status(400).send({
                status: false,
                error: "Price cannot be lower than 0.00"
            })
        }
        if (wallet.balance < amount) {
            return res.status(400).send({
                status: false,
                error: "Insufficient funds"
            })
        }
        this.#wallet.updateRecord(wallet.id, {
            ...wallet,
            balance: wallet.balance - amount
        })

        return true 
    }

}


module.exports = new WalletController()