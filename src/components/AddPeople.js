import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import config from "../Config/Config";
import NavigationBar from "./Navbar";