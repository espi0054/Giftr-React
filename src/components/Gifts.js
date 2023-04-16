import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import config from "../Config/Config";
import { Card, Container } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineGift } from "react-icons/ai";
import NavigationBar from "./Navbar";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [person, setPerson] = useState({});
  const { token, setTokenHandler, axiosRequest } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token, navigate]);

  const { userId } = useParams();

  useEffect(() => {
    const request = {
      method: "get",
      url: `${config.BACKEND_URL}api/gifts/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosRequest(request).then((data) => {
      setGifts(data.gifts);
      setPerson(data.person);
    });
  }, [token, axiosRequest, setTokenHandler]);

  console.log("gifts", gifts);

  return (
    <>
      <NavigationBar
        left="back"
        leftPath="/people"
        right="add"
        rightPath={`/people/${userId}/gifts/add`}
      />
      {gifts.length === 0 ? (
        <h1 className="text-white text-center m-2">
          No Gift Found for {person.name}...
        </h1>
      ) : (
        <Container>
          <h1 className="text-center text-capitalize my-4 mx-1 text-white">
            Gift ideas for {person.name}
          </h1>
          {gifts.map((gift) => (
            <Card className="my-3 py-2" key={gift._id}>
              <Card.Body className="d-flex justify-content-between ">
                <div>
                  <Card.Title>{gift.idea}</Card.Title>
                  <Card.Text> {gift.location}</Card.Text>
                  <small className="p"> {gift.website}</small>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    className="m-1 bg-primary text-white py-2 px-3 h5 rounded me-3"
                    to={`/people/${userId}/gifts/${gift._id}`}
                  >
                    <AiOutlineEdit />
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
};

export default Gifts;