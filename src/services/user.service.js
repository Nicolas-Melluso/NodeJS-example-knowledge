import userSchema from '../models/user.entity.js';
import { encrypt } from '../utils/password.encrypt.js';
import { connectDB, closeDB } from '../config/db/mongoose.config.js'

export const saveUser = async (username, password, image) => {
    try {
        await connectDB();

        const hashedPassword = await encrypt(password);

        const newUser = new userSchema({
            username: username,
            password: hashedPassword,
            isNewPlayer: true,
            stack: 0,
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

// Función para obtener todos los usuarios (solo sus nombres de usuario)
export const getUsers = async () => {
    try {
        const users = await userSchema.find({}, "username");
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        throw new Error("Failed to get users");
    }
}

// Función para buscar un usuario por su nombre de usuario
export const findUserByUsername = async (username) => {
    try {
        await connectDB();
        const user = await userSchema.findOne({ username: username }, "username");
        return user;
    } catch (error) {
        console.error("Error finding user by username:", error);
        throw new Error("Failed to find user by username");
    } finally {
        await closeDB();
    }
}
