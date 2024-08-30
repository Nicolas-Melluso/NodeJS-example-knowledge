import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routers/routes.js";

//const SocketIO = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
