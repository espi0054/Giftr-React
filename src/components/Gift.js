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
}