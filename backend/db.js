const mongoose = require('mongoose');
require('dotenv').config({
    path: './../.env.local'
});
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        );
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;