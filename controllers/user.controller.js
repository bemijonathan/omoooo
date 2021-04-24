const { User, Wallet } = require("../model/model");
// const { newToken } = require("../utils/token");
const jwt = require('jsonwebtoken');


const newToken = user => {
    return jwt.sign({ id: user.id }, "secretValue", {
        expiresIn: '100h'
    })
}



class UserController {


    #user = User;
    #wallet = Wallet;
    getUsers = (req, res) => {
        const users = this.#user.getAllRecords()
        return res.status(200).send({
            status: true,
            data: users,
            message: "success"
        })
    }

    getUser = (id) => {
        const users = this.#user.getRecord(id )
        return users
    }

    createUser = (req, res) => {
        try {
            const { name } = req.body;
            console.log(req.body)
            const user = this.#user.createRecord({ name } )
            console.log(user)
            this.#wallet.createRecord({
                userId: user.id,
                walletId: '0000000' + 'ab' + user.id,
                balance: 0.00
            })
            const token = newToken(user)
            return res.status(201).send({
                status: true,
                data: { ...user, token },
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                status: false,
                message: 'error'
            })
        }
    }
}


module.exports = new UserController()

