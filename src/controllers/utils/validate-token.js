const { verify } = require("jsonwebtoken");

exports.tokenValidation = (req, resp, next) => {
    const token = req.get("x-session-token");

    try {
        if (!token) return resp.status(401).json({ msg: "You don't have permission to do this request" });

        verify(token, process.env.SECRET, (e) => {
            console.log(e)
            if (e) return resp.status(401).json({ msg: "Your session has expired" });
            next();
        });
    } catch(e) {
        next(e);
    }
};