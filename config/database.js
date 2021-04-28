const mongoose = require('mongoose');
const config = require('../utils/config');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDB;
