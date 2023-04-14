import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import People from "./components/people";
import LoginSuccess from "./components/loginSuccess";
import { ContextProvider } from "./contexts/ContextProvider";
import AddPeople from "./components/AddPeople";
import Person from "./components/Person";
import Gifts from "./components/Gifts";
import AddGift from "./components/AddGift";
import Gift from "./components/Gift";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="d-flex flex-column bg-info min-vh-100 ">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/people" element={<People />} />
            <Route exact path="/people/add" element={<AddPeople />} />
            <Route exact path="/people/:id" element={<Person />} />
            <Route exact path="/people/:userId/gifts" element={<Gifts />} />
            <Route
              exact
              path="/people/:userId/gifts/add"
              element={<AddGift />}
            />
            <Route exact path="/people/:userId/gifts/:id" element={<Gift />} />
            <Route exact path="/login/success" element={<LoginSuccess />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
