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
  const { axiosRequest, token } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    let request = {
      method: "get",
      url: `${config.BACKEND_URL}api/gift/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosRequest(request)
      .then((data) => {
        console.log(data);
        setGiftIdea(data.idea);
        setStoreLocation(data.location);
        setWebsiteURL(data.website);
        setPersonName(data.personId.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNotFound(true);
        }
      });
  }, []);

  const handleSave = async (event) => {
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
    let request = {
      method: "patch",
      url: `${config.BACKEND_URL}api/gift/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axiosRequest(request);
    navigate(`/people/${userId}/gifts`);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    let request = {
      method: "delete",
      url: `${config.BACKEND_URL}api/gift/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axiosRequest(request);
      navigate(`/people/${userId}/gifts`);
    } catch (error) { }
  };

  if (notFound) {
    return <h1>Not Found...</h1>;
  }
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

export default Gift;
