import register from '../routers/register.js';
import user from '../routers/user.js';
import table from '../routers/table.js';
import login from '../routers/login.js';

export default app => {
    app.use("/api/v1/register", register);
    app.use("/api/v1/login", login);
    app.use("/api/v1/users", user);
    app.use("/api/v1/tables", table);
};