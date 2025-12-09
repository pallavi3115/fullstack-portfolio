import React, { useState } from 'react';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';
import { subscribeNewsletter } from '../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await subscribeNewsletter(email);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message || 'Successfully subscribed to newsletter!'
        });
        setEmail('');
        setSubscribed(true);
        
        // Reset subscribed state after 5 seconds
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error subscribing. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <FiMail />
            <span className="font-medium">Stay Updated</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Subscribe to Our Newsletter
            <span className="block text-blue-200">Stay Ahead of the Curve</span>
          </h2>
          
          <p className="text-blue-100 max-w-2xl mx-auto mb-10">
            Get the latest insights, project updates, and industry news delivered directly to your inbox.
            No spam, unsubscribe anytime.
          </p>

          {/* Subscription Form */}
          <div className="max-w-xl mx-auto">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-100 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-100 border border-red-500/30'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                    disabled={loading || subscribed}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 min-w-[160px] ${
                    subscribed
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : subscribed ? (
                    <>
                      <FiCheck />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-4">📰</div>
                <h4 className="font-semibold mb-2">Weekly Updates</h4>
                <p className="text-blue-200 text-sm">Latest industry insights</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="font-semibold mb-2">Exclusive Content</h4>
                <p className="text-blue-200 text-sm">Tips and best practices</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-4">🔒</div>
                <h4 className="font-semibold mb-2">No Spam</h4>
                <p className="text-blue-200 text-sm">Unsubscribe anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;