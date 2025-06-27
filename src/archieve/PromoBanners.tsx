import React from 'react';

const PromoBanners = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chocolate Banner */}
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[300px] flex items-center">
            <div className="relative z-10 max-w-md">
              <div className="text-primary text-3xl font-bold mb-4">Upto 25% Off</div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-dark mb-4">
                Luxa Dark Chocolate
              </h3>
              <p className="text-gray-600 mb-6">
                Very tasty & creamy vanilla flavour creamy muffins.
              </p>
              <button className="bg-dark text-white px-8 py-3 rounded-lg font-semibold uppercase hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-red-300 rounded-full opacity-30"></div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-400 rounded-full opacity-20"></div>
          </div>

          {/* Muffins Banner */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[300px] flex items-center">
            <div className="relative z-10 max-w-md">
              <div className="text-primary text-3xl font-bold mb-4">Upto 25% Off</div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-dark mb-4">
                Creamy Muffins
              </h3>
              <p className="text-gray-600 mb-6">
                Very tasty & creamy vanilla flavour creamy muffins.
              </p>
              <button className="bg-dark text-white px-8 py-3 rounded-lg font-semibold uppercase hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-300 rounded-full opacity-30"></div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;