import userSchema from '../models/user.entity.js';
import { encrypt } from '../utils/password.encrypt.js';
import { connectDB, closeDB } from '../config/db/mongoose.config.js'

export const createUser = async (username, password, role, image) => {
    try {
        await connectDB();

        const hashedPassword = await encrypt(password);
        
        const newUser = new userSchema({
            username,
            password: hashedPassword,
            stack: 500,
            level: 1,
            role,
            accountsClaimed: []
        }); 
        
        if(image) {
            const { filename } = image;
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
export const findAllUsers = async () => {
    try {
        await connectDB();
        const users = await userSchema.find({ enabled: true });
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        throw new Error("Failed to get users");
    } finally {
        await closeDB();
    }
}

// Función para buscar un usuario por su nombre de usuario
export const findUserByUsername = async (username) => {
    try {
        await connectDB();
        const user = await userSchema.findOne({ username: username });
        return user;
    } catch (error) {
        console.error("Error finding user by username:", error);
        throw new Error("Failed to find user by username");
    } finally {
        await closeDB();
    }
}

// Función para buscar un usuario por su id
export const findUserById = async (id) => {
    try {
        await connectDB();

        const user = await userSchema.findById(id);

        return user;
    } catch (error) {
        console.error("Error finding user by id:", error);
        throw new Error("Failed to find user by id");
    } finally {
        await closeDB();
    }
}

// Función para buscar un usuario por su id
export const findAndUpdateUserById = async (id, updateRequest) => {
    try {
        await connectDB();
        
        const user = await userSchema.findByIdAndUpdate(id, updateRequest);

        return user;
    } catch (error) {
        console.error("Error updating user by id:", error);
        throw new Error("Failed updating user by id");
    } finally {
        await closeDB();
    }
}

// Soft Delete user by ID
export const softDeleteUserById = async (id) => {
    try {
        await connectDB();
        const user = await userSchema.findByIdAndUpdate(id, { enabled: false });
        return user;
    } catch (error) {
        console.error("Error updating user by id:", error);
        throw new Error("Failed updating user by id");
    } finally {
        await closeDB();
    }
}