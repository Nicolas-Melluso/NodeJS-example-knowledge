import { saveUser } from '../services/user.service.js';

export const register = async (req, res) => {
    
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "Username and password are mandatory fields"
        });
    }

    try {
        const newUser = await saveUser(username, password);

        if (newUser) {
            return res.status(201).send({
                message: "User has been created",
                user: {
                    id: newUser.id,
                    username,
                    password: newUser.password
                }
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "User cannot be saved"
        });
    }
};