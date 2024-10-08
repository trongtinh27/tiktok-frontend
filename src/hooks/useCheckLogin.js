import { useUser } from "~/contexts/UserContext";
import { useAuth } from "~/components/AuthModal";

const useCheckLogin = () => {
  const { isLoggedIn } = useUser();
  const { setIsOpenLogin } = useAuth();

  const checkLogin = (callback) => {
    if (!isLoggedIn) {
      setIsOpenLogin(true);
    } else {
      callback();
    }
  };

  return checkLogin;
};

export default useCheckLogin;
