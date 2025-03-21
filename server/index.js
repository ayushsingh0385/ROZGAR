const express = require("express");
const dotenv = require("dotenv");
const mongoDB = require("./connectDB");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path=require("path")
const userRoute = require("./routes/user.route");
const WorkersRoute = require("./routes/Workers.route");
const menuRoute = require("./routes/menu.route");
dotenv.config();
const app = express();
const http=require("http");
const socketio=require("socket.io");
const server=http.createServer(app);
const io=socketio(server)
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

io.on("connection",function(socket) {
    socket.on("send-location",function(data) {
        io.emit("receive-location",{id:socket.id,...data});
    }) ;
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
}) 

mongoDB();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/Workers", WorkersRoute);
app.use("/api/v1/menu", menuRoute);

// Connect to MongoDB BEFORE starting the server
app.get("/",function(req,res) {
    res.render("index");
});
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
