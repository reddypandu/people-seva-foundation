import "./App.css";
import { FloatingActions, Footer, Header } from "./navbar";
import Home from "./home";
import AboutUs from "./about-us";
import Volunteer from "./volunteer";
import Contact from "./contact";
import { useEffect } from "react";

const seoByPage = {
  "/": {
    title: "People Seva Foundation | Empowering Women in Hyderabad",
    description:
      "People Seva Foundation works to empower women through education, skill development, employment opportunities and community initiatives, creating a stronger and more inclusive society.",
  },
  "/about": {
    title: "About Us | People Seva Foundation",
    description:
      "Learn how People Seva Foundation supports women through education, mentorship, skills, opportunity, and compassionate community initiatives.",
  },
  "/volunteer": {
    title: "Volunteer with Us | People Seva Foundation",
    description:
      "Join People Seva Foundation as a volunteer and help create education, skill development, employment, and support opportunities for women.",
  },
  "/contact": {
    title: "Contact Us | People Seva Foundation Hyderabad",
    description:
      "Contact People Seva Foundation in Ameerpet, Hyderabad to learn more, request support, volunteer, or collaborate on women empowerment initiatives.",
  },
};

function updateMetaTag(attribute, value, content) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function App() {
  const page =
    window.location.pathname === "/"
      ? "/"
      : `/${window.location.pathname.split("/")[1]}`;

  useEffect(() => {
    const seo = seoByPage[page] || seoByPage["/"];
    document.title = seo.title;
    updateMetaTag("name", "description", seo.description);
    updateMetaTag("property", "og:title", seo.title);
    updateMetaTag("property", "og:description", seo.description);
  }, [page]);

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
      <FloatingActions />
    </>
  );
}

export default App;
