

const User = require('../model/model');
const { Router } = require('express');
const walletController = require('../controllers/wallet.controller');
const { protect } = require('../utils/token');

const route = Router('/')


/**
 * @swagger
 * components:
 *   schemas:
 *     Wallet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The wallet ID.
 *         userId: 
 *           type: string    
 *           description: the user ID
 *         walletId:
 *           type: string
 *           description: The wallets Id.
 */


/**
 * @swagger
 *  /wallets:
 *     get:
 *        summary: Retrieve a users wallet
 *        description: Retrieve a users wallet.
 *        responses: 
 *           200:
 *             description: A single users Wallet.
 *             content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                            status: 
 *                              type: boolean
 *                            data:
 *                              $ref: '#/components/schemas/Wallet'     
 */

route.route('/').get(protect, walletController.getWallet);


/**
 * @swagger
 *  /wallets/deposit:
 *     post:
 *        summary: Deposit into wallet
 *        description: Deposit Wallet.
 *        requestBody:
 *           required: true
 *           content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          walletId:
 *                              type: string
 *                              description: The user's wacllet Id.
 *                          amount:
 *                              type: number
 *                              description: Amount to Transfer
 *                          narration:
 *                              type: string
 *                              description: The Description of the transaction
 *                          from:
 *                              type: string
 *                              description: where the money comes from 
 *        responses: 
 *           201:
 *             description: Deposit into Wallet.
 *             content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          status: 
 *                              type: boolean
 *                          data:
 *                              type: string     
 */
route.route('/deposit').post(protect, walletController.deposit);

/**
 * @swagger
 *  /wallets/withdraw:
 *     post:
 *        summary: Withdraw from wallet
 *        description: Withdraw from wallets.
 *        requestBody:
 *           required: true
 *           content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          walletId:
 *                              type: string
 *                              description: The user's wallet Id.
 *                          amount:
 *                              type: string
 *                              description: The amount the user sentf
 *                          narration: 
 *                              type: string
 *                              description: The description of the transaction
 *        responses: 
 *           201:
 *             description: Create single user.
 *             content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          status: 
 *                              type: boolean
 *                          data:
 *                              type: string
 */
route.route('/withdraw').post(protect, walletController.withDrawal)

/**
 * @swagger
 *  /wallets/transfer:
 *     post:
 *        summary: Transfer to another wallet
 *        description: Transfer to other wallets.
 *        requestBody:
 *           required: true
 *           content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          recieverWallet:
 *                              type: string
 *                              description: The recievers Wallet.
 *                          amount:
 *                              type: string
 *                              description: The amount
 *                          walletId:
 *                              type: string
 *                              description: the senders wallet Id
 *                          narration:
 *                              type: string
 *                              description: narration for transaction
 *        responses: 
 *           201:
 *             description: Create single user.
 *             content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          status: 
 *                              type: boolean
 *                          data:
 *                              $ref: '#/components/schemas/User'     
 */
route.route('/transfer').post(protect, walletController.transferFunds)



module.exports = route