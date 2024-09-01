import userSchema from '../models/user.entity.js';
import { encrypt } from '../utils/password.encrypt.js';
import { connectDB, closeDB } from '../config/db/mongoose.config.js'

export const saveUser = async (username, password, image) => {
    try {
        await connectDB();

        const hashedPassword = await encrypt(password);

        const newUser = new userSchema({
            username: username,
            password: hashedPassword
        });

        if(image) {
            const {filename} = image;
            newUser.imgUrlProfile = filename;
        }

        await newUser.save();

        return newUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw new Error("Failed to save user");
    } finally {
        await closeDB();
    }
}

export const getUsers = async () => {
    try {
        const users = await userSchema.find({}, "username");
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        throw new Error("Failed to get users");
    }
}