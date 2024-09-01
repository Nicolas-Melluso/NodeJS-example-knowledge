import register from '../routers/register.js';

export default app => {
    app.use("/api/v1/register", register);
};