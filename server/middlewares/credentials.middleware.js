const allowedOrigin = ["http://localhost:5173"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", true);
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
};

export default credentials;