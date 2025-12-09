import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs'; // Add this import
import ProjectsSection from '../components/ProjectsSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AboutUs /> {/* Add AboutUs here - before ProjectsSection */}
        <ProjectsSection />
        <ClientsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;