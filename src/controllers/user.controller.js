import { saveUser, findUserByUsername } from '../services/user.service.js';

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

        const newUser = await saveUser(username, password, image);

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
