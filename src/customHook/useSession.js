import { useState, useEffect } from "react";

const useSession = (key, initialState) => {
  const [state, setState] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? storedValue : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useSession;
