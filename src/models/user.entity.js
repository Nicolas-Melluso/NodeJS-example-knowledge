import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isNewPlayer: { type: Boolean, required: false },
    imgUrlProfile: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

export default User;