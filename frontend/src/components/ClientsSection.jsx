import React, { useState, useEffect } from 'react';
import { FiStar,FiMessageCircle } from 'react-icons/fi';
import { getClients } from '../services/api';

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating = 5 }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="clients" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-2 rounded-full shadow-sm mb-6">
            <FiStar className="text-yellow-500" />
            <span className="font-semibold text-gray-700">Testimonials</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from businesses we've helped transform their digital presence.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-2xl backdrop-blur-sm">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Testimonials Yet</h3>
            <p className="text-gray-500">Client testimonials will appear here once added.</p>
          </div>
        ) : (
          <>
            {/* Client Testimonials */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {clients.map((client, index) => (
                <div
                  key={client._id}
                  className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                    activeIndex === index ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-start mb-6">
                    <div className="relative">
                      <img
                        src={client.image?.startsWith('http') ? client.image : `http://localhost:5000${client.image}`}
                        alt={client.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400';
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full">
                          <FiMessageCircle size={14} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">{client.name}</h4>
                      <p className="text-purple-600 text-sm font-medium">{client.designation}</p>
                      <StarRating />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 italic relative">
                    <FiMessageCircle className="absolute -top-2 -left-2 text-gray-200 text-3xl" />
                    {client.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index
                      ? 'bg-purple-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">Projects Delivered</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Client Retention</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;