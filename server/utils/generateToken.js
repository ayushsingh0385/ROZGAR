const jwt = require('jsonwebtoken');

const generateToken = ( res,user) => {
    console.log("Inside generateToken - Received user:", user);
    console.log("Inside generateToken - Type of user:", typeof user);
    console.log("Inside generateToken - User._id:", user?._id);

    if (!user || !user._id) {
        throw new Error("User object is missing or does not have an _id");
    }

    const token = jwt.sign(
        { userId: user._id.toString() },  // Convert _id to string
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });

    return token;
};

module.exports =  generateToken ;
