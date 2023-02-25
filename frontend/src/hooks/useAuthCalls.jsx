import { useDispatch } from "react-redux";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  fetchFail,
} from "../features/authSlice";
import { axiosPublic } from "./useAxios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("account/auth/login/", userInfo);

      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/yedekparca");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Login can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("account/auth/logout/");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  return {
    login,
    logout,
  };
};

export default useAuthCalls;
