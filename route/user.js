

const User = require('../model/model');
const { Router } = require('express');
const userController = require('../controllers/user.controller');

const route = Router('/')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *         token:
 *           type: string
 *           
 */


/**
 * @swagger
 *  /users:
 *     get:
 *        summary: Retrieve a list of JSONPlaceholder users
 *        description: Retrieve a list of users.
 *        responses: 
 *           200:
 *             description: A single user.
 *             content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          status: 
 *                              type: boolean
 *                          data:
 *                              type: array 
 *                              items:  
 *                                  $ref: '#/components/schemas/User'     
 */
route.route('/').get(userController.getUsers)


/**
 * @swagger
 *  /users:
 *     post:
 *        summary: Add a new user
 *        description: Add to list of users.
 *        requestBody:
 *           required: true
 *           content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The user's name.
 *                              example: Leanne Graham
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
route.route('/').post(userController.createUser)

module.exports = route