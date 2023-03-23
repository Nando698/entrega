import cookieParser from "cookie-parser";
import session from "express-session";
import express from "express";
const app = express();
import MongoStore from "connect-mongo";
import passport from "passport";
import "dotenv/config";

///////////// session
import { signUp_strategy, login_strategy } from "./strategies.js";
import { modelo } from "./models.js";

///////////// socket / chat
import socket from "./chat.socket.js";

///////////// path
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

///////////// mongo
import { mongoConnection } from "./db.js";
mongoose.connect(mongoConnection);
import mongoose from "mongoose";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

///////////// Utils
import { validatePass } from "./services.js";

///////////// Routes
import routes from "./routes/index.js";

///////////// Multer
import { upload } from "./multer.js";

/////////////// General conf / middle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/////////////// Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnection,
      mongoOptions,
    }),

    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: parseInt(process.env.SESSION_TIME_LIMIT),
    },
  })
);

/////////////// Registro
app.post(
  "/users/register",
  upload.single("avatar"),
  validatePass,
  await passport.authenticate("register", {
    failureRedirect: "/error",
  }),
  (req, res) => res.redirect("/")
);
app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

///////////////PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use("register", signUp_strategy);
passport.use("login", login_strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  modelo.findById(id, done);
});

app.use("/", express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use("/", routes);

const expressServer = app.listen(process.env.PORT, function () {
  console.log(`Server listeningg port  ${this.address().port}`);
});

//SOCKET PARA EL CHAT

socket(expressServer);
