import React from "react";
import Hero from "../../components/hero/Hero";
import Announcements from "../../components/announcement/Announcements";
import About from "../../components/about/About";
import Statistics from "../../components/statistics/Statistics";
import ContactForm from "../../components/contact/ContactForm";
import Gallery from "../../components/gallery/Gallery";

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
