import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from '../pages/Home.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import ServicesPage from '../pages/Services.jsx';
import SafetyPage from '../pages/SafetyPage.jsx';
import WhoWeArePage from '../pages/WhoWeAre.jsx';
import OurClientsPage from '../pages/OurClients.jsx';
import CaseStudies from '../pages/CaseStudies.jsx';
import { ScrollToTop, HashScroll } from './ScrollToTop.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScroll />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/about/who-we-are" element={<WhoWeArePage />} />
        <Route path="/about/our-clients" element={<OurClientsPage />} />
        <Route path="/about/safety" element={<SafetyPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
