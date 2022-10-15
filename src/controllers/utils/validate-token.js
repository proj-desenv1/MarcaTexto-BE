const { verify } = require("jsonwebtoken");

exports.tokenValidation = (req, resp, next) => {
    const message = "Your session has expired"
    const token = req.get("x-session-token");

    try {
        if (!token) return resp.status(401).json({ msg: message });

        verify(token, process.env.SECRET, (e) => {
            console.log(e)
            if (e) return resp.status(401).json({ msg: message });
            next();
        });
    } catch(e) {
        next(e);
    }
};