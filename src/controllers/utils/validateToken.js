const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.validateToken = (token, next) => {
    let err = {message:"", status:400};
    try {
        if (!token) {
            err.message = "Access token is missing.";
            throw err;
        }

        console.log('passou')
        jwt.verify(token, secret, (error, payload) => {
            if(error){
                err = {message:"Invalid Token", status: 403};
                throw err;       
            }
            else{
                // console.log("User id: "+ payload.id);
                next();
            };
        });
    } catch (err) {
        throw err;
    };
}  