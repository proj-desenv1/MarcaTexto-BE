const { verify } = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.tokenValidation = (req, resp, next) => {
    const token = req.get("x-session-token");

    try {
        if (!token) return resp.status(401).json({ msg: "Você não possui permissão para realizar esta ação" });

        verify(token, process.env.SECRET, (e, payload) => {
            if (e) return resp.status(401).json({ msg: "Sessão expirada" });
            
            req.userId = payload.uso_id;
            next();
        });
    } catch(e) {
        next(e);
    }
};