const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Ensure this is defined
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
