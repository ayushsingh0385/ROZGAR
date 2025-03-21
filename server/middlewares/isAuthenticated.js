const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // If token is not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        // Verify the token using the secret key
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the user ID to the request object
        req.id = decode.userId;

        // Proceed to the next middleware/handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        // Handle unexpected errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { isAuthenticated };
