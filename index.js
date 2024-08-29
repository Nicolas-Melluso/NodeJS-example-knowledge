require('dotenv').config()
const express = require("express");
const path = require('path');
const routes = require("./src/routers/routes");


//const SocketIO = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
routes(app);
  
app.get("*", (req, res) =>
    res.status(404).send({
        message: "Web page not exits, try with http://localhost:3000/api/login/"
    })
);

//const server = 
app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`);
})


//const io = SocketIO(server);
