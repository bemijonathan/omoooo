const { User, Wallet } = require('../model/model');
const request = require('supertest');
const app = require('../server');

let token;
let wallet;

describe('shoud create a new account for every user and a wallet', () => {
    it('shoud create a new account for every user', function (done) {
        request(app)
            .post('/users')
            .send({
                name: "jonathan Atiene"
            })
            .set('Accept', 'application/json')
            .expect(201).then(response => {
                expect(response.body.data.id).toBe(1)
                expect(response.body.data.name).toEqual("jonathan Atiene")
                expect(response.body.data.token).toBeTruthy()
                token = response.body.data.token
                done()
            })
    })

    it('shoud create a new account for every user', function (done) {
        request(app)
            .post('/users')
            .send({
                name: "Chigozie Jesse"
            })
            .set('Accept', 'application/json')
            .expect(201).then(response => {
                expect(response.body.data.id).toBe(2)
                expect(response.body.data.name).toEqual("Chigozie Jesse")
                expect(response.body.data.token).toBeTruthy()
                done()
            })
    })

    it('should create a wallet for first user', () => {
        wallet = Wallet.getWalletByUserId(1)
        expect(wallet).toBeTruthy()
        expect(wallet.balance).toEqual(0)
        expect(wallet.userId).toBe(1)
    });
})


describe('users should be able to deposit and withdraw from their wallet ', () => {
    it('should be able to do deposit in users wallet', (done) => {
        request(app)
            .post('/wallets/deposit')
            .set("authorization", 'Bearer ' + token)
            .send({
                "walletId": wallet.walletId,
                "amount": 4000,
                "narration": "adding to my wallet",
                "from": "card"
            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body.status).toBe(true);
                done()
            })
    });

    it('wallet should show a balance of 4000', () => {
        wallet = Wallet.getWalletByUserId(1)
        expect(wallet).toBeTruthy()
        expect(wallet.balance).toEqual(4000)
        expect(wallet.userId).toBe(1)
    });


    it('should be able to do withdrawal in users wallet', function (done) {
        request(app)
            .post('/wallets/withdraw')
            .set("authorization", 'Bearer ' + token)
            .send({
                "walletId": wallet.walletId,
                "amount": 2000,
                "narration": "withdrawing for lunch ",
            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body.status).toBe(true);
                done()
            })
    });


    it('wallet should show a balance of 2000', () => {
        wallet = Wallet.getWalletByUserId(1)
        expect(wallet).toBeTruthy()
        expect(wallet.balance).toEqual(2000)
        expect(wallet.userId).toBe(1)
    });



    it('should return insufficient fund if i try to withdraw more than my balance', function (done) {
        request(app)
            .post('/wallets/withdraw')
            .set("authorization", 'Bearer ' + token)
            .send({
                "walletId": wallet.walletId,
                "amount": 2001,
                "narration": "withdrawing for lunch ",
            })
            .set('Accept', 'application/json')
            .expect(400).then(response => {
                expect(response.body.status).toBe(false);
                done()
            })
    });


    it('wallet should show a balance of 2000', () => {
        wallet = Wallet.getWalletByUserId(1)
        expect(wallet).toBeTruthy()
        expect(wallet.balance).toEqual(2000)
        expect(wallet.userId).toBe(1)
    });


})


describe('users should be able to transfer from their wallet ', () => {
    it('should be able to transfer to another wallet', function (done) {

        const recieverWallet = Wallet.getWalletByUserId(2)

        request(app)
            .post('/wallets/transfer')
            .set("authorization", 'Bearer ' + token)
            .send({
                "recieverWallet": recieverWallet.walletId,
                "amount": 1000,
                "walletId": wallet.walletId,
                "narration": "string"
            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body.status).toBe(true);
                done()
            })
    });


    it('should reflect as new balance on the recievers wallet', () => {
            wallet = Wallet.getWalletByUserId(2)
            expect(wallet).toBeTruthy()
            expect(wallet.balance).toEqual(1000)
            expect(wallet.userId).toBe(2)
        });

})

