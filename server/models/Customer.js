import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: String,
    company: String,
}, {collection: 'Customer', // Explicitly specify collection names
    versionKey: false}); // Disable version key (__v) in db

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;