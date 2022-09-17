import {Strategy as LocalStrategy} from "passport-local";
import {hashPassword, isValidPassword} from "./services.js";
import {modelo} from './models.js'
import mongoose from "mongoose";
import {mongoConnection} from  './db.js'
mongoose.connect(mongoConnection).then(()=>console.log("Conexión establecida con Mongo")).catch(error=>console.log("error: ", error));

//DEFINO ESTRATEGIA DE REGISTRO//
const signUp_strategy = new LocalStrategy({
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            
            const existingUser = await modelo.findOne({
                username
            });

            if (existingUser) {
                return done(null, null);
            }

            const newUser = {
                
                password: hashPassword(password),
                username: req.body.username,
                firstName: req.body.input_name,
                lastName: req.body.input_lastName,
            };

            const createdUser = await modelo.create(newUser);

            done(null, createdUser);
        } catch (err) {
            
            done("Error en registro", null);
        }
    }
);

//DEFINO ESTRATEGIA DE LOGUEO//
const login_strategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await modelo.findOne({ 
            username
        });

        if (!user || !isValidPassword(password, user.password)) {
            return done(null, null);
        }

        done(null, user);
    } catch (err) {
        console.log("Error login", err);
        done(null, null);
    }
});



export {
    signUp_strategy,
    login_strategy
}