import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import config from "../Config/Config";
import NavigationBar from "./Navbar";

const Person = () => {
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