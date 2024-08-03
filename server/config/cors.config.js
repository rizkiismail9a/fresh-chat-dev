const allowedOrigin = [
  "http://localhost:5000",
  "http://localhost:8000",
  "https://dev-fresh-chat.my.id",
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
