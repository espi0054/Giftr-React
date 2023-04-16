import { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import config from "../Config/Config";
import { Context } from "../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineGift } from "react-icons/ai";
import NavigationBar from "./Navbar";

const People = () => {
  return (
    <>
      <NavigationBar left="logout" right="add" rightPath="/people/add" />
      {people.length === 0 ? (
        <h1 className="text-white text-center m-2">No People Found...</h1>
      ) : (
        <Container>
          {people.map((person) => (
            <Card className="m-3 py-2" key={person._id}>
              <Card.Body className="d-flex justify-content-between ">
                <div>
                  <Card.Title>{person.name}</Card.Title>
                  <Card.Text>
                    Date of Birth: {new Date(person.dob).toLocaleDateString()}
                  </Card.Text>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    className="m-1 bg-primary text-white py-2 px-3 h6 rounded"
                    to={`/people/${person._id}`}
                  >
                    <AiOutlineEdit />
                  </Link>
                  <Link
                    className="m-1 bg-primary text-white py-2 px-3 h6 rounded"
                    to={`/people/${person._id}/gifts`}
                  >
                    <AiOutlineGift />
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

export default People;