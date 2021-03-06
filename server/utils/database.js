const mongoose = require('mongoose');

const config = require('config');

exports.databaseConnection = async (cb) => {
    try {
        await mongoose.connect(config.get('DB_URL'), {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB.');
        cb();
    }
    
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}