import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // <-- important
  const API = import.meta.env.VITE_SERVER;

  useEffect(() => {
    axios
      .get(`${API}/api/user`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));  // <-- auth check finished
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
