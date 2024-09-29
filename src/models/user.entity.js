import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: false, alias: 'user_id' }, //Analize better why we use this?
    username: { type: String, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    imgUrlProfile: { type: String, required: false, alias: 'img_url_profile' },
    stack: { type: Number, required: true },
    level: { type: Number, required: false },
    dealer: { type: Boolean, required: false, default: false },
    casinoOwner: { type: Boolean, required: false, default: false},
    role: { type: String, required: true, default: 'user' },
    accountsClaimed: [{ id: { type: mongoose.Schema.Types.ObjectId, required: true, alias: 'accounts_claimed' }}]
});

const User = mongoose.model('User', userSchema);

export default User;