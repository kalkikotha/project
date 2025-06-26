import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const BrandSection = () => {
  const brands = [
    {
      name: "Honey best nectar you wish to get",
      category: "Amber Jar",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    },
    {
      name: "Organic Fresh Milk",
      category: "Dairy Products",
      image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    },
    {
      name: "Premium Coffee Beans",
      category: "Beverages",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    },
    {
      name: "Fresh Baked Bread",
      category: "Bakery",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    },
    {
      name: "Artisan Cheese Selection",
      category: "Dairy Products",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    },
    {
      name: "Seasonal Fruit Mix",
      category: "Fresh Produce",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1"
    }
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">Newly Arrived Brands</h2>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">
              View All Categories <ArrowRight className="inline ml-1" size={16} />
            </a>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-1">{brand.category}</p>
                  <h5 className="font-semibold text-dark leading-tight">{brand.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;