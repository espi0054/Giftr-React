import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import config from "../Config/Config";
import NavigationBar from "./Navbar";

const Gift = () => {
  const [giftIdea, setGiftIdea] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [personName, setPersonName] = useState("");

  const { userId, id } = useParams();
  const { token } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <NavigationBar left="back" leftPath={`/people/${userId}/gifts`} />

      <Container>
        <h2 className="text-center text-capitalize my-4 text-white">
          Edit Gift for {personName}
        </h2>
        <Form className="mx-auto">
          <Form.Group controlId="giftIdea" className="w-75 mx-auto">
            <Form.Label>Gift idea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter gift idea"
              value={giftIdea}
              onChange={(e) => setGiftIdea(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="storeLocation" className="w-75 mx-auto">
            <Form.Label>Store | Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter store or location"
              value={storeLocation}
              onChange={(e) => setStoreLocation(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="websiteURL" className="w-75 mx-auto">
            <Form.Label>Website URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website URL"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
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
              className="m-2"
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
            >
              Delete
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};