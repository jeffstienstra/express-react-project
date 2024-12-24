
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    twoFactorEnabled: {type: Boolean, default: false},
    twoFactorCode: {type: String},
    twoFactorExpiry: {type: Date},
}, {collection: 'User', // Explicitly specify collection names
     versionKey: false}); // Disable version key (__v) in db

const User = mongoose.model('User', UserSchema);

export default User;