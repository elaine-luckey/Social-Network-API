//import mongoose 
const mongoose = require('mongoose');

//Connect to Mongoose
//Hide MongoDB URI in the .env for security purposes
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api')
    .then(() => console.log('Mongoose connected'))
    .catch(err => console.log(err));

    module.exports = mongoose.connection;