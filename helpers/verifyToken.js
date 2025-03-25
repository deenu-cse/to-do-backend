require("dotenv").config();
const jwt = require("jsonwebtoken");

const KEY = process.env.SECRET_KEY;

const decodeToken = (token) => {
    try {
        if (!token) throw new Error("Token is missing");

        const checkToken = token.split(" ")[1];
        if (!checkToken) throw new Error("Invalid token format");

        const decoded = jwt.verify(checkToken, KEY);
        if (!decoded || !decoded.userId) throw new Error("Invalid token payload");

        return decoded.userId;
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return null;
    }
};

module.exports = { decodeToken }
