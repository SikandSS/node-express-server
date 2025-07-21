const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Joi = require('joi');
const session = require('express-session');
const passport = require('./config/passport');
const { logger, morganStream } = require('./utils/logger');
const helmet = require('helmet');
const corsMiddleware = require('./middleware/cors');
const compression = require('compression');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
const validate = require('./middleware/validate');
const { userSchema } = require('./validation/user');
const userController = require('./controllers/userController');
const userRouter = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(morgan('combined', { stream: morganStream }));
app.use(helmet());
app.use(compression());
// app.use(xss());
// app.use(mongoSanitize());
app.use(corsMiddleware);
app.use(errorHandler);

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express Server API',
    version: '1.0.0',
    description: 'API documentation for the Express server',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Development server' },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/express-server';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen( process.env.PORT || 3000, () => {
  logger.info(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
