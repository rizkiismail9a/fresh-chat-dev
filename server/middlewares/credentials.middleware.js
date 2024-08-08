const allowedOrigin = [
  "http://localhost:5000",
  "http://localhost:8000",
  "https://dev-fresh-chat.my.id",
  "fresh-chat-dev-git-dev-rizkiismail9as-projects.vercel.app",
];

function credentials(req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", true);
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
}

module.exports = credentials;
