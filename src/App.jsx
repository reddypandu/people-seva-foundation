import "./App.css";
import { Footer, Header } from "./navbar";
import Home from "./home";
import AboutUs from "./about-us";
import Volunteer from "./volunteer";
import Contact from "./contact";

function App() {
  const page =
    window.location.pathname === "/"
      ? "/"
      : `/${window.location.pathname.split("/")[1]}`;

  const pages = {
    "/": <Home />,
    "/about": <AboutUs />,
    "/volunteer": <Volunteer />,
    "/contact": <Contact />,
  };

  return (
    <>
      <Header activePage={page} />
      <main>{pages[page] || <Home />}</main>
      <Footer />
    </>
  );
}

export default App;
