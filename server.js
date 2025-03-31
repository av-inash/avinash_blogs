import http from "http";
import app from "./src/index.js";


const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port);
console.log(` Server is running on port ${port}. Let's do this! 💪`);
