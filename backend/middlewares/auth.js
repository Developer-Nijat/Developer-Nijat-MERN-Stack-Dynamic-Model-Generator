const jwt = require("jsonwebtoken");
const config = require("config");

const accessDeniedError = (res) =>
  res.status(401).json({ message: "Access denied. No token provided" });

const getJwtFromCookie = (req) => {
  const cookies = req.headers.cookie;
  const cookieJwt =
    cookies &&
    cookies
      .split(";")
      .map((c) => c.split("="))
      .map(([key, val]) => [key.trim(), val.trim()])
      .find(([key, val]) => key == "jwt");

  return cookieJwt && cookieJwt[1];
};

module.exports = authMiddleware = async (req, res, next) => {
  let cookieJwt = getJwtFromCookie(req);
  let token =
    cookieJwt || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token || token.length < 10) return accessDeniedError(res);

  if (token && token.startsWith("Bearer")) {
    token = token.replace("Bearer ", "");
  }

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("auth.privatekey"));

    req.claims = decoded;
    next();
  } catch (ex) {
    console.log("authMiddleware token error: ", ex);
    res.status(401).json({ message: "Invalid token", error: ex });
  }
};
