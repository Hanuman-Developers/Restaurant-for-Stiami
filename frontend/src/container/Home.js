import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import Chef from "./Chef/Chef";
import FindUs from "./FindUs/FindUs";
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Header from "./Header/Header";
import Intro from "./Intro/Intro";
import Laurels from "./Laurels/Laurels";
import Menu from "./Menu/Menu";
import { Navbar } from "../components";
function Home() {
  return (
    <div>
      <Navbar />
      {/* <Header />
      <AboutUs />
      <Menu />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUs />
      <Footer />  */}
    </div>
  );
}

export default Home;
