const allowedOrigin = ["http://localhost:5000"];
const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Kamu tidak punya akses ke sini, kata cors"));
    }
  },
};

export default corsOption;