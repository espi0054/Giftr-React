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

  console.log(left);
  const currentUrl = window.location.href;
  useEffect(() => {
    console.log("url", currentUrl);
  }, [currentUrl]);
  return (
    <Navbar bg="primary">
      {!left ? null : left === "logout" ? (
        <Nav>
          <Link className="text-white" onClick={logoutHandler}>
            <AiOutlineLogout className="h1 m-1" />
          </Link>
        </Nav>
      ) : (
        <Nav>
          <Link className="text-white" to={leftPath}>
            <IoArrowBackCircleOutline className="h1 m-1" />
          </Link>
        </Nav>
      )}
      <div className="mx-auto">
        <h2 className="text-white">Giftr</h2>
      </div>
      {!right ? null : (
        <Nav>
          <Link className="text-white" to={rightPath}>
            <AiOutlinePlusCircle className="h1 m-1" />
          </Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default NavigationBar;
