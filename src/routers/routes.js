module.exports = routes = app => {
    app.use("/api/v1/register", require("./register"));
};