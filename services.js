import bcrypt from 'bcrypt'


function auth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render('error', {
            data: 'No estas autorizado'
        })
    }
}

 function  hashPassword(password) {
    return  bcrypt.hashSync(password,  bcrypt.genSaltSync(10));
}


 function isValidPassword(plainPassword, hashedPassword) {
    return  bcrypt.compareSync(plainPassword, hashedPassword);
}

function validatePass(req, res, next) {
    if(req.body.password !== req.body.password2){
        return  res.render('error', {data: 'Las contraseñas no coinciden'})
    }

    if(req.body.password.length < 8) {
        return  res.render('error', {data: 'La contraseña es demasiado corta'})
    }

    return next()
}




export {
    auth,
    hashPassword,
    isValidPassword,
    validatePass
}