import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {

    const { JWt_SECRET } = process.env;
    if (!JWt_SECRET) {
        throw new Error("JWT_SECRET is not Configured")
    }


    const token = jwt.sign({ userId }, JWt_SECRET, {
        expiresIn: "7d",
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//MS
        httpOnly: true,//prevent XSS attacks:cross-site scripting

        sameSite: "strict",//CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    });
    return token;
}