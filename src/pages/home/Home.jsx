import React from "react";
import Hero from "../../components/homeComponents/hero/Hero";
import Announcements from "../../components/homeComponents/announcement/Announcements";
import About from "../../components/homeComponents/about/About";
import Statistics from "../../components/homeComponents/statistics/Statistics";
import ContactForm from "../../components/homeComponents/contact/ContactForm";
import Gallery from "../../components/homeComponents/gallery/Gallery";

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <Announcements />
      <About />
      <Statistics />
      <ContactForm />
      <Gallery />
    </div>
  );
}

export default Home;
