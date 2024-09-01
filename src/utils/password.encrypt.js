import bcrypt from 'bcrypt';

export const encrypt = (str) => {
   return bcrypt.hash(str, 10);
}