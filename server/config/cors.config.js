const allowedOrigin = [
  "http://localhost:5000",
  "http://localhost:8000",
  "https://dev-fresh-chat.my.id",
  "fresh-chat-dev-git-dev-rizkiismail9as-projects.vercel.app",
];
const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Kamu tidak punya akses ke sini, kata cors"));
    }
  },
};

module.exports = corsOption;
