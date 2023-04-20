import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import config from "../Config/Config";
import NavigationBar from "./Navbar";

const Person = () => {
  const [name, setName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [dob, setDob] = useState("");
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const { axiosRequest, token, setTokenHandler } = useContext(Context);

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    let request = {
      method: "get",
      url: `${config.BACKEND_URL}api/people/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosRequest(request)
      .then((data) => {
        const date = new Date(data.dob);
        const formattedDate = date.toISOString().substring(0, 10);
        setDob(formattedDate);
        setName(data.name);
        setInitialName(data.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNotFound(true);
        }
      });
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    if (name === "" || dob === "") {
      alert("Name and Date of birth is required");
      return;
    }
    let data = JSON.stringify({
      name: name,
      dob: new Date(dob).getTime(),
    });
    let request = {
      method: "patch",
      url: `${config.BACKEND_URL}api/people/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axiosRequest(request);
      navigate("/people");
    } catch (error) { }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    let request = {
      method: "delete",
      url: `${config.BACKEND_URL}api/people/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axiosRequest(request);
      navigate("/people");
    } catch (error) { }
  };

  if (notFound) {
    return <h1>Not Found...</h1>;
  }
  return (
    <>
      <NavigationBar left="back" leftPath="/people" />
      <Container>
        <h1 className="text-center text-capitalize my-4 text-white">
          Edit {initialName}
        </h1>
        <Form className="mx-auto">
          <Form.Group controlId="formName" className="w-75 mx-auto">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDob" className="w-75 mx-auto">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="w-75 mx-auto mt-2 d-flex justify-content-center align-items-center">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSave}
              className="m-2"
            >
              Save
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={(event) => {
                let del = window.confirm("Are you sure you want delete ? ");
                console.log(del);
                if (del) {
                  handleDelete(event);
                } else {
                  event.preventDefault();
                }
              }}
              className="m-2"
            >
              Delete
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Person;