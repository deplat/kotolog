require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const apicache = require('apicache');

const uri = process.env.DATABASE_URL;
const v1KotoRouter = require('./v1/routes/kotoRoutes');

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;

const connectKotoDB = () => {
  mongoose.connect(uri, { dbName: "kotolog" })
    .then(() => console.log('Connected to KotoDB'))
    .catch(err => console.error('Could not connect to KotoDB.', err));
};

app.use(express.json());
// reapp.use(cache('1 hour'));
app.use('/api/v1/cats', v1KotoRouter);

connectKotoDB();

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

