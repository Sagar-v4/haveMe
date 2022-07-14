// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://haveme_test:have.test.project@haveme.8caoqen.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const conn = () => {
    try {
         mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    } catch (err) {
        throw err;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log('MongoDB disconnected!');
})
mongoose.connection.on("connected", () => {
    console.log('MongoDB connected!');
})

module.exports = conn;