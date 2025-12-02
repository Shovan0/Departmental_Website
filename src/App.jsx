import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import DepartmentPage from "./pages/department/DepartmentPage.jsx";
import FacultyList from "./pages/faculty/FacultyList.jsx";
import Achievement from "./pages/achievement/Achievement";
import Alumni from "./pages/alumni/Alumni";
import About from "./components/homeComponents/about/About";
import ApplyCertificate from "./pages/profile/forms/ApplyCertificate.jsx";
import ApplyNOC from "./pages/profile/forms/ApplyNOC.jsx";
import ApplyQuery from "./pages/profile/forms/ApplyQuery.jsx";

import "./App.css";
import Alumni from "./pages/Alumni/Alumni.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/department" element={<DepartmentPage />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/applyCertificate" element={<ApplyCertificate />} />
          <Route path="/profile/applyNOC" element={<ApplyNOC />} />
          <Route path="/profile/applyQuery" element={<ApplyQuery />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
