import mongoose from 'mongoose';
import { createUser, findUserByUsername, findAllUsers, findUserById, softDeleteUserById, findAndUpdateUserById} from '../services/user.service.js';
import { decrypt } from '../utils/password.encrypt.js';

export const register = async (req, res) => {    
    const { username, password } = req.body;
    
    const image = req.file ? req.file : null;

    if (!username || !password) {
        return res.status(400).send({
            message: "Username and password are mandatory fields"
        });
    }

    try {
        const existingUser = await findUserByUsername(username); // Función que busca si el usuario ya existe

        if (existingUser) {
            return res.status(409).send({ // 409 Conflict para indicar que ya existe
                message: "Username is already taken"
            });
        }

        const newUser = await createUser(username, password, image);

        if (newUser) {
            return res.status(201).send({
                message: "User has been created",
                user: {...newUser.toObject()}
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "User cannot be saved"
        });
    }
};

export const login = async (req, res) => {    
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "Username and password are mandatory fields"
        });
    }

    try {
        const existingUser = await findUserByUsername(username); // Función que busca si el usuario ya existe

        if (!existingUser) {
            return res.status(409).send({ // 409 Conflict para indicar que ya existe
                message: "Incorrect username"
            });
        }

        const passwordCompared = await decrypt(password, existingUser.password);

        if (passwordCompared) {
            return res.status(200).send({
                ...existingUser.toObject(),
                accessAllowed: passwordCompared
            }); 
        } 

        return res.status(403).send({
            accessAllowed: passwordCompared
        })
        
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "User cannot be saved"
        });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({
            message: "Exist some error in our server, try later."
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await findUserById(id);

        if(!user) {
            return res.status(404).send({
                message: "User was not founded by id"
            })
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            message: "Exist some error in our server, try later."
        });
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(404).send({
                message: "User not found, review typing errors please"
            })
        }
        
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            message: "Exist some error in our server, try later."
        });
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        
        const {
            username,
            enabled,
            stack,
            level,
            dealer,
            accountsClaimed
        } = req.body;



        const updateData = {};
        if (username !== undefined) updateData.username = username;
        if (enabled !== undefined) updateData.enabled = enabled;
        if (stack !== undefined) updateData.stack = stack;
        if (level !== undefined) updateData.level = level;
        if (dealer !== undefined) updateData.dealer = dealer;
        if (accountsClaimed !== undefined) updateData.accountsClaimed = accountsClaimed;

        const userUpdated = await findAndUpdateUserById(id, updateData, { new: true });

        if (!userUpdated) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userUpdated);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const userDeleted = await softDeleteUserById(id);
        return res.status(200).send({ 
            id: userDeleted.id,
            username: userDeleted.username,
            stack: userDeleted.stack
        });
    } catch (error) {
        return res.status(500).send({
            message: "Exist some error in our server, try later."
        });
    }
}

/* When a new user is login is updated the userId with the websocketId */
export const assingWebSocketId = async (req, res) => {
 //not yet but implement later
}

export const changePassword = async (req, res) => {
    //implement later
}