import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useResize = () => {
  const [isOnMobile, setIsOnMobile] = useState(window.innerWidth <= 768); // Initialize the state for the first render
  const navigate = useNavigate();

  useEffect(() => {
    // Keep the previous screen condition
    let prevIsOnMobile = isOnMobile;

    const handleResize = () => {
      // Check the current screen condition
      const currentIsOnMobile = window.innerWidth <= 768;

      if (currentIsOnMobile !== prevIsOnMobile) {
        setIsOnMobile(currentIsOnMobile);
        prevIsOnMobile = currentIsOnMobile;

        if (currentIsOnMobile) {
          navigate("/chats");
        } else {
          navigate("/home");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOnMobile, navigate]);

  return { isOnMobile };
};

export default useResize;
