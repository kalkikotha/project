import React from 'react';

const DiscountSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-4xl py-16 px-8 lg:px-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-success rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary rounded-full"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark mb-6">
                Get <span className="text-primary">25% Discount</span> on your first purchase
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst amet, metus, sit massa posuere maecenas. At tellus ut nunc amet vel egestas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="abc@mail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
                    Subscribe to the newsletter
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;