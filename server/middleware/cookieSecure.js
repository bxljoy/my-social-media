const cookieSecure = (req, res, next) => {
  res.cookie("exampleCookie", "exampleValue", {
    sameSite: "none", // Set SameSite to None
    secure: true, // Mark the cookie to be used with HTTPS only
    httpOnly: true, // Optional: Increases security by restricting access to the cookie from JavaScript
    maxAge: 3600000, // Sets the cookie to expire after 1 hour (value in milliseconds)
  });

  next();
};

export default cookieSecure;
