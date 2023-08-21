import "./db/database.js";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import productsRouter from "./routes/productsRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import usersRouter from "./routes/userRouter.js";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { allMsgController } from "./controllers/messagesControllers.js";
import {
  allMsgService,
  createMsgService,
} from "./services/messagesServices.js";
import passport from "passport";
import "./config/passport.config.js";
import "./config/passport.github.js";
import dotenv from "dotenv";
import { isUser } from "./middlewares/authVerification.js";
import emailRouter from "./routes/emailRouter.js";
import { logger } from './utils/logger.js';


dotenv.config();

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("Servidor listen to puerto 8080"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
    store: new MongoStore({
      mongoUrl:
        'mongodb+srv://admin:Kyuba2389@backend.bi0kmfo.mongodb.net/',
      ttl: 10,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/chat", viewsRouter);
app.use("/cart", cartsRouter);
app.use("/api", emailRouter);

app.get("/error", (req, res) => {
  logger.error("error de endopoint");
  res.send("Funciona ok el logger");
});

app.use(errorHandler);


const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  logger.info("👌 server ok en port by Winston", PORT);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("✅ Nueva conexion activa!", socket.id);

  socketServer.emit("messages", await allMsgController());

  socket.on("disconnect", () => {
    console.log("🚫 Usuario fuera!");
  });

  socket.on("newUser", (user) => {
    console.log(`${user} Estas logueado`);
  });

  socket.on("chat:message", isUser, async (msg) => {
    console.log(msg);
    await createMsgService(msg);
    socketServer.emit("messages", await allMsgService());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
