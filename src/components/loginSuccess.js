import { useEffect, useContext } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import NavigationBar from "./Navbar";

const LoginSuccess = () => {

  return (
    <>
      <NavigationBar />
      <h1>Login Successful</h1>
    </>
  )

}

export default LoginSuccess