import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

// import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Details from "./pages/profile/Details";
import Department from "./pages/profile/Department";
import Query from "./pages/profile/Query";
import EditProfile from "./pages/profile/EditProfile";
import Signout from "./pages/profile/Signout";

import ApplyNOC from "./pages/profile/forms/ApplyNOC";
import ApplyCertificate from "./pages/profile/forms/ApplyCertificate";
import ApplyQuery from "./pages/profile/forms/ApplyQuery";

import "./App.css";

function App() {
  return (
     <Router>
      <Navbar />
      
      <Routes>
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/profile/details" element={<Details />} />
        <Route path="/profile/department" element={<Department />} />
        <Route path="/profile/query" element={<Query />} />
        <Route path="/profile/editProfile" element={<EditProfile />} />

        <Route path="/apply/noc" element={<ApplyNOC />} />
        <Route path="/apply/certificates" element={<ApplyCertificate />} />
        <Route path="/apply/query" element={<ApplyQuery />} />
      </Routes>
    </Router>
  );
}

export default App;
