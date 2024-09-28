import bcrypt from 'bcrypt';

export const encrypt = (str) => {
   return bcrypt.hash(str, 10);
}

export const decrypt = (str, hash) => {
   return bcrypt.compare(str, hash);
}