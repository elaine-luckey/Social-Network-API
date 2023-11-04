//import express, connection.js file and routes files
const express = require ('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const router = express();

//middlewares
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(routes);

//Connect to MongoDB before starting express server
db.once('open', () => {
    router.listen(PORT, () => {
        console.log(`Server is now listening on PORT ${PORT}`)
    });
});