import { useEffect, useContext } from "react";
import Config from "../Config/Config";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar";

const Home = () => {
  const { token } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/people");
    }
  }, [token, navigate]);
}