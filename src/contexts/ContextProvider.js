import { createContext } from "react";
import useSession from "../customHook/useSession";
import axios from "axios";
const Context = createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useSession("userToken", "");

  const setTokenHandler = (jwt) => {
    setToken(jwt);
  };

  const axiosRequest = async (request) => {
    const response = await axios.request(request);
    return response.data.data;
  };

  return (
    <Context.Provider
      value={{
        token,
        setTokenHandler,
        axiosRequest,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
