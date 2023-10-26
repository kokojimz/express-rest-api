require('dotenv').config();
const mongoose = require('mongoose');
// Connect to MongoDB database using Mongoose.

// Access variables
const dbHost = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const initDatabase = function () {
    mongoose
    .connect(dbHost,{
        dbName: dbName,
        user: dbUser,
        pass: dbPassword,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then(() => {
        console.log('Mongodb connected...');
    })
    .catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on('error', err => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection is disconnected");
});

// Menangani sinyal SIGINT
process.on('SIGINT', async () => {
    try {
        console.log("Closing Mongoose connection...");
        await mongoose.connection.close();
        console.log("Mongoose connection closed due to app termination...");
        setTimeout(() => {
            process.exit(0);
        }, 1000); // Menunggu 1 detik sebelum keluar
    } catch (err) {
        console.error("Error closing mongoose connection:", err);
        process.exit(1);
    }
});

// Menangani sinyal SIGTERM
process.on('SIGTERM', () => {
    console.log("Received SIGTERM. Closing Mongoose connection...");
    mongoose.connection.close(false, () => {
        console.log('Mongoose connection closed due to app termination.');
        process.exit(0);
    });
});
};

module.exports = initDatabase;