const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const ALLOWED_CORS = require('./utils/cors');

const app = express();
app.use(cors({
  origin: ALLOWED_CORS,
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    app.listen(3000);
  })
  .catch(() => {
    process.exit();
  });

app.use(express.json());
app.use(router);
app.use(errors());
app.use(errorHandler);
