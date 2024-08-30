import { register } from '../controllers/user.controller.js';

export default app => {
    app.use("/api/v1/register", register);
};