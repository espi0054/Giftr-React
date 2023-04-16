import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import config from "../Config/Config";
import { Form, Button, Container } from "react-bootstrap";
import NavigationBar from "./Navbar";
const AddGift = () => {
  const [giftIdea, setGiftIdea] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  const { axiosRequest, token, setTokenHandler } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);
  const { userId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!giftIdea || !storeLocation || !websiteURL) {
      alert("All parameters are required");
      return;
    }
    let data = JSON.stringify({
      idea: giftIdea,
      location: storeLocation,
      website:
        websiteURL.startsWith("http://") || websiteURL.startsWith("https://")
          ? websiteURL
          : `https://${websiteURL}`,
      userId: userId,
    });
    const request = {
      method: "POST",
      url: `${config.BACKEND_URL}api/gift`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axiosRequest(request);
    navigate(`/people/${userId}/gifts`);
  };
  return (
    <>
      <NavigationBar left="back" leftPath={`/people/${userId}/gifts`} />
      <Container>
        <h2 className="text-center text-capitalize my-4  text-white">
          Add Gift idea for
        </h2>
        <Form onSubmit={handleSubmit} className="mx-auto">
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
            <Button variant="primary" type="submit" className="m-2 btn-lg">
              Save
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddGift;
