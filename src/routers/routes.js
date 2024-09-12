import register from '../routers/register.js';
import user from '../routers/user.js';

export default app => {
    app.use("/api/v1/register", register);
    //app.use("/api/v1/login", register); I leave this route prepared for login in nexts tasks
    app.use("/api/v1/users", user);

};