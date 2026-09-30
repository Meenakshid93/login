const jwt = require("jsonwebtoken");
const jwtsecretkey ='my-secret-key-12345';

const authMiddleware =(req,res,next)=> {
    // 1. Read Authorization header
  const authHeader = req.headers.authorization;

  // 2. Extract the token
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  // 3. Check whether token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required"
    });
  }

  try {
    // 4. Verify the token
    const decoded = jwt.verify(
      token,
      jwtsecretkey
    );

    // 5. Attach user information to request
    req.user = decoded;

    // 6. Continue to the next handler
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }

}

module.exports = authMiddleware;