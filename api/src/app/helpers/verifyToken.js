import jwt from 'jsonwebtoken'
require('dotenv').config()

// middleware to validate token
const checkToken = (req, res, next) => {

    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: "Acesso negado!" });
    console.log(process.env.APP_SECRET)

    try {
        const verified = jwt.verify(token, process.env.APP_SECRET);
        req.user = verified;
        next(); // to continue the flow
    } catch (err) {
        res.status(400).json({ error: "O Token é inválido!" });
    }

};

export default checkToken;