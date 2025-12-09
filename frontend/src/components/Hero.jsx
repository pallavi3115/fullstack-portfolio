import React from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <FiCheckCircle />
              <span className="text-sm font-medium">Professional Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Presence Today
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              We provide comprehensive solutions including consultation, design, and marketing services 
              to help businesses thrive in the digital landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <span>Get Started</span>
                <FiArrowRight />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                <span>View Our Work</span>
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Completed</div>
              <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full mt-3"></div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
              <div className="h-2 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full mt-3"></div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
              <div className="h-2 bg-gradient-to-r from-green-200 to-green-100 rounded-full mt-3"></div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
              <div className="h-2 bg-gradient-to-r from-orange-200 to-orange-100 rounded-full mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;