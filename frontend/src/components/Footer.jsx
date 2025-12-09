import React from 'react';
import { 
  FiHome, FiBriefcase, FiUsers, FiMail, 
  FiPhone, FiMapPin, FiFacebook, FiTwitter, 
  FiLinkedin, FiInstagram, FiGithub 
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#home', icon: <FiHome /> },
        { name: 'Projects', href: '#projects', icon: <FiBriefcase /> },
        { name: 'Clients', href: '#clients', icon: <FiUsers /> },
        { name: 'Contact', href: '#contact', icon: <FiMail /> },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Consultation', href: '#' },
        { name: 'Design', href: '#' },
        { name: 'Marketing', href: '#' },
        { name: 'Development', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Support', href: '#' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FiFacebook />, href: '#', label: 'Facebook' },
    { icon: <FiTwitter />, href: '#', label: 'Twitter' },
    { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FiInstagram />, href: '#', label: 'Instagram' },
    { icon: <FiGithub />, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">PortfolioPro</h2>
                <p className="text-gray-400">Professional Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              We provide comprehensive digital solutions to help businesses 
              transform their online presence and achieve their goals.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiPhone className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="text-blue-400" />
                <span>info@portfoliopro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="text-blue-400" />
                <span>123 Business St, City, Country</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-bold mb-6 text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © {currentYear} PortfolioPro. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Full Stack Development Assignment
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div className="text-center mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Designed and developed for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;