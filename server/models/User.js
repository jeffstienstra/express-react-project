
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
}, {collection: 'User', // Explicitly specify collection names
     versionKey: false}); // Disable version key (__v) in db

const User = mongoose.model('User', UserSchema);

export default User;