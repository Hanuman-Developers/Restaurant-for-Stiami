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
import VerticalNavbar from "../components/VerticalNavbar/VerticalNavbar";
// import VerticalNavbar from "../components/VerticalNavbar/VerticalNavbar";
// import VerticalNav from "../components/VerticalNav/VerticalNav";
// import Sidebar from "../components/VerticalNav/Sidebar";
// import Calendar from "../components/Calendar/Calendar";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div>
      <Header />
      <AboutUs />
      <Chef />
      {/* <Intro /> */}
      <Laurels />
      <Gallery />
      <FindUs />
    </div>
  );
}

export default Home;
