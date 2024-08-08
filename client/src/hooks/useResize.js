import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useResize = () => {
  const [isOnMobile, setIsOnMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOnMobile(true);
        navigate("/chats");
      } else {
        setIsOnMobile(false);
        navigate("/home");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isOnMobile };
};

export default useResize;
