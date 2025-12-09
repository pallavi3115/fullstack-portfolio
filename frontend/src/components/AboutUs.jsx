import React from 'react';
import { FiUsers, FiCheckCircle, FiClock, FiCode } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            ABOUT OUR COMPANY
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We Craft Digital Experiences
            <span className="block text-blue-600">That Drive Results</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            We combine strategic thinking with digital expertise to create solutions that 
            not only look great but also deliver measurable business impact.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Story */}
          <div>
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                  <FiClock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Founded in 2018, we started as a small team of passionate developers with a 
                vision to transform how businesses interact with technology. What began as a 
                startup has grown into a full-service digital agency serving clients globally.
              </p>
              <p className="text-gray-600">
                Our journey has been fueled by innovation, dedication, and a relentless 
                pursuit of excellence. Every project is an opportunity to push boundaries 
                and create something extraordinary.
              </p>
            </div>

            {/* Approach */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-4">
                  <FiCode size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Approach</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span className="text-gray-700">Strategic Planning & Discovery</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span className="text-gray-700">User-Centered Design</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span className="text-gray-700">Agile Development Process</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span className="text-gray-700">Quality Assurance & Testing</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span className="text-gray-700">Ongoing Support & Maintenance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Stats & Image */}
          <div className="relative">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mr-3">
                  <FiUsers />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Meet Our Team</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our diverse team brings together expertise in design, development, 
                marketing, and strategy to deliver comprehensive solutions.
              </p>
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white"></div>
                ))}
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white text-sm">
                  +5
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Learn more about our team →
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life. Our team is ready to help you 
            achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </a>
            <a
              href="#projects"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;