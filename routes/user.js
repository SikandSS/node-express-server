const express = require('express');
const passport = require('../config/passport');
const validate = require('../middleware/validate');
const { userSchema, loginSchema } = require('../validation/user');
const userController = require('../controllers/userController');
const Joi = require('joi');

const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/login', validate(loginSchema), passport.authenticate('local'), userController.login);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile (protected)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profile data
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', userController.profile);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User validated and created
 *       400:
 *         description: Validation error
 */
router.post('/', validate(userSchema), userController.createUser);

module.exports = router; 