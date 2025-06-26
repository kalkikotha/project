import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Star, Plus, Minus, ShoppingCart } from 'lucide-react';

const BestSellingProducts = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 18.00,
      rating: 4.5,
      unit: "1 kg",
      discount: 15,
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      id: 2,
      name: "Tomato Ketchup",
      price: 8.50,
      rating: 4.3,
      unit: "500ml",
      discount: 15,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      id: 3,
      name: "Organic Bananas",
      price: 12.00,
      rating: 4.8,
      unit: "1 Bunch",
      discount: 15,
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      id: 4,
      name: "Premium Milk",
      price: 6.99,
      rating: 4.6,
      unit: "1 Liter",
      image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      id: 5,
      name: "Fresh Orange Juice",
      price: 15.00,
      rating: 4.7,
      unit: "750ml",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      id: 6,
      name: "Artisan Bread",
      price: 9.50,
      rating: 4.4,
      unit: "1 Loaf",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    }
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">Best selling products</h2>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">
              View All Categories <ArrowRight className="inline ml-1" size={16} />
            </a>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-primary text-white hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 bg-primary text-white hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative mb-4">
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-success text-white text-xs font-semibold px-2 py-1 rounded-lg z-10">
                    -{product.discount}%
                  </span>
                )}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 z-10">
                  <Heart size={16} />
                </button>
                <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-dark text-lg leading-tight">{product.name}</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 uppercase tracking-wide">{product.unit}</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-primary fill-current" />
                    <span className="font-semibold text-dark">{product.rating}</span>
                  </div>
                </div>

                <div className="text-2xl font-bold text-dark">${product.price.toFixed(2)}</div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-l-lg transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-medium">1</span>
                    <button className="w-8 h-8 flex items-center justify-center text-success hover:bg-green-50 rounded-r-lg transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button className="flex items-center gap-2 text-dark hover:text-primary transition-colors text-sm font-medium">
                    Add <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;