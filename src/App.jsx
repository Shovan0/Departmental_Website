import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import EditProfile from "./pages/profile/EditProfile";
import DepartmentPage from "./pages/department/DepartmentPage.jsx";
// import Faculty from "./pages/faculty/Faculty";
import Achievement from "./pages/achievement/Achievement";
import Alumni from "./pages/alumni/Alumni";
import About from "./components/homeComponents/about/About";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/department" element={<DepartmentPage />} />
          {/* <Route path="/faculty" element={<Faculty />} /> */}
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
