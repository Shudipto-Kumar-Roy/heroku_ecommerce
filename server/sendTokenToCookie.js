// creating and saving token to cookies
const sendTokenToCookie = (user, statusCode, res) => {
  const token = user.getJWTtoken();

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: user,
    token: token,
  });
};

module.exports = sendTokenToCookie;
