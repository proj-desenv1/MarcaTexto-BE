const { verify } = require("jsonwebtoken");

exports.tokenValidation = (req, resp, next) => {
    const token = req.get("x-session-token");

    try {
        if (!token) return resp.status(401).json({ msg: "You don't have permission to do this request" });

        verify(token, process.env.SECRET, (e, payload) => {
            if (e) {
                console.log(e);
                return resp.status(401).json({ msg: "Your session has expired" });
            }
            req.userId = payload.uso_id;
            next();
        });
    } catch(e) {
        next(e);
    }
};