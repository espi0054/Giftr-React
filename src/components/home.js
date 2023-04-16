import { useEffect, useContext } from "react";
import Config from "../Config/Config";
import { Container, Button } from "react-bootstrap";
import { Context } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar";
const Home = () => {
  const { token } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("======", token);
    if (token) {
      navigate("/people");
    }
  }, [token, navigate]);
  const googleAuth = (event) => {
    event.target.disabled = true;
    window.open(
      `${Config.BACKEND_URL}auth/google?redirect_url=${Config.REDIRECT_URL}`,
      "_self"
    );
  };
  return (
    <>
      <NavigationBar />
      <Container className="flex-grow-1 d-flex flex-column  justify-content-center align-items-center">
        {/* <Row>
        <Col> */}
        <h1 className="text-center mb-5 text-white font-weight-bold">
          Login with Google Authentication
        </h1>
        <Button onClick={googleAuth} className="btn-lg">
          Login
        </Button>
        {/* </Col>
      </Row> */}
      </Container>
    </>
  );
};

export default Home;
