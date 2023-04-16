import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import NavigationBar from "./Navbar";

const LoginSuccess = () => {
  const { setTokenHandler, token } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/people");
    }
  }, [token, navigate]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token);
    if (token) {
      setTokenHandler(token);
      setTimeout(() => navigate("/people"), 100);
    } else {
      navigate("/");
    }
  }, [setTokenHandler, navigate]);
  return (
    <>
      <NavigationBar />
      <h1>Login Success</h1>
    </>
  );
};

export default LoginSuccess;
