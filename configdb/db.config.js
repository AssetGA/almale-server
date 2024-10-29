require("dotenv").config();

const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gtt2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0l`;

module.exports = {
  mongoUrl,
};
