import { useEffect, useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlinePlusCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Context } from "../contexts/ContextProvider";

const NavigationBar = ({ left, right, rightPath, leftPath }) => {
  const { token, setTokenHandler } = useContext(Context);

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    setTokenHandler("");
    navigate("/");
  };
}