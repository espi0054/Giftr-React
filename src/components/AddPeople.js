import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import config from "../Config/Config";
import NavigationBar from "./Navbar";

const AddPeople = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { axiosRequest, token, setTokenHandler } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || dateOfBirth === "") {
      alert("Name and Date of birth is required");
      return;
    }
    console.log(name, dateOfBirth);
    let data = JSON.stringify({
      name: name,
      dob: new Date(dateOfBirth).getTime(),
    });

    const request = {
      method: "POST",
      url: `${config.BACKEND_URL}api/people`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axiosRequest(request);
    navigate("/people");
  };

  return (
    <>
      <NavigationBar left="back" leftPath="/people" />

      <Container>
        <h2 className="text-center text-capitalize my-4  text-white">
          Add Person
        </h2>
        <Form onSubmit={(e) => handleSubmit(e)} className="mx-auto">
          <Form.Group controlId="formName" className="w-75 mx-auto">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className="w-75 mx-auto">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="w-75 mx-auto mt-2 d-flex justify-content-center align-items-center">
            <Button variant="primary" type="submit" className="m-2 btn-lg">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddPeople;