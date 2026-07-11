/*
 * App.jsx
 * Main application entry point mounting the Navbar, Footer, and
 * dynamically routing between Resources, Alumni, Alumni Detailed, and Alumni View All views.
 */
import { Routes, Route, useNavigate } from "react-router-dom";
import StaggeredMenu from "./components/ui/StaggeredMenu";
import Logo from "./assets/BrandLogo.png";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Alumni from "./pages/Alumni";
import AlumniDetailed from "./pages/AlumniDetailed";
import AlumniViewAll from "./pages/AlumniViewAll";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-between">
      <div>
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={[
            {
              label: "Home",
              ariaLabel: "Go to home page",
              link: "/",
              onClick: () => navigate("/"),
            },
            {
              label: "Alumni",
              ariaLabel: "View alumni",
              link: "/alumni",
              onClick: () => navigate("/alumni"),
            },
            {
              label: "Resources",
              ariaLabel: "View resources",
              link: "/resources",
              onClick: () => navigate("/resources"),
            },
            {
              label: "Events",
              ariaLabel: "View events",
              link: "#events",
              onClick: () => {},
            },
            {
              label: "Community",
              ariaLabel: "Join community",
              link: "#community",
              onClick: () => {},
            },
          ]}
          socialItems={[
            { label: "Facebook", link: "https://facebook.com/mvpblocks" },
            { label: "Instagram", link: "https://instagram.com/mvpblocks" },
            { label: "Twitter", link: "https://twitter.com/mvpblocks" },
            { label: "GitHub", link: "https://github.com/mvpblocks" },
            { label: "Dribbble", link: "https://dribbble.com/mvpblocks" },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#1f2937"
          openMenuButtonColor="#1f2937"
          changeMenuColorOnOpen={true}
          colors={["#ffedd5", "#f37f30"]}
          logoUrl={Logo}
          accentColor="#f37f30"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Alumni" element={<Alumni />} />
          <Route path="/AlumniDetailed/:id" element={<AlumniDetailed />} />
          <Route path="/AlumniViewAll" element={<AlumniViewAll />} />
          <Route path="/Resources" element={<Resources />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
