const mongoose = require("mongoose");

exports.connectToDatabase = async () => {
  const data = await mongoose.connect(process.env.DB_URL);
  console.log(`Database connected with the server ${data.connection.host}`);
};
