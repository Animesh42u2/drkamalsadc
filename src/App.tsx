import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail"; 
import WisdomTeeth from "./pages/WisdomTeeth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import { COLORS, FONT } from "./theme";

// The only two things a `style={{}}` prop genuinely cannot do: pull in a
// webfont, and reset default browser margins on every element. Everything
// else in this project is inline styles inside its own .tsx file — this
// is the one small, page-wide exception, kept in this file rather than a
// separate .css file.
const GLOBAL_RESET = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; width: 100%; }
  body { font-family: ${FONT.body}; color: ${COLORS.text}; background: ${COLORS.white}; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
`;

function App() {
  return (
    <>
      <style>{GLOBAL_RESET}</style>
      <SplashScreen />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Treatments" element={<Services />} />
          <Route path="/Gallery" element={<WisdomTeeth />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Treatments/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;