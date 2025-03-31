import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()



export const generateJwtToken = async(data, time) => {
    const secretKey = process.env.SECRET_KEY;
    try {
        let token;
        if (time) {
            token = jwt.sign(data, secretKey, { expiresIn: time });
        } else {
            token = jwt.sign(data, secretKey);
        }
        return {
            status: 1,
            token,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            error: error,
        };
    }
};
