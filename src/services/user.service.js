import userSchema from '../models/user.entity.js';

export const saveUser = async (username, password) => {
    console.log('aaaaaaaaaaaaaaaaaaa', userSchema.baseModelName);
}

export const getUsers = async () => {
    console.log("get all users");
    
}