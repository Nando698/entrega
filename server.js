import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express'
const app = express();
import MongoStore from 'connect-mongo';
import passport from 'passport';
import 'dotenv/config'
import Yargs from "yargs";
const args = Yargs(process.argv.slice(2)).default({port: 3000}).argv;
const port = args.port

/////////////
import { signUp_strategy, login_strategy } from './strategies.js';
import {modelo, products_model, cart_model} from './models.js'



/////////////
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))


/////////////
import {mongoConnection} from './db.js'
mongoose.connect(mongoConnection)
import cluster from "cluster";

/////////////
import { auth , validatePass} from './services.js';
import mongoose from 'mongoose';


/////////////
import routes from "./routes/index.js"


/////////////
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const PORT = Number(process.argv[2]) || 3000;
const iscluster = process.argv[3] == "cluster";




app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnection, mongoOptions
    }),

    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.post('/register',  validatePass ,await passport.authenticate('register', {failureRedirect: '/error'}), (req,res) => res.redirect('/'))
app.post('/login', passport.authenticate('login', {failureRedirect: '/login-error', failureMessage: true}), (req,res) => res.redirect('/'))


passport.use('register', signUp_strategy)
passport.use('login', login_strategy )

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  modelo.findById(id, done)
})





app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



if (iscluster && cluster.isPrimary) {


  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {
  app.use('/', express.static( __dirname + '/public' ));

 
 
 
  app.listen(PORT, () => {
    console.log(`Server listening port  ${PORT}`);
  });
}


app.use("/", routes)




