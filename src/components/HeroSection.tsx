import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      category: "100% natural",
      title: "Fresh Smoothie & Summer Juice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      buttonText: "Shop Now"
    },
    {
      category: "100% natural",
      title: "Fresh Smoothie & Summer Juice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      buttonText: "Shop Collection"
    },
    {
      category: "100% natural",
      title: "Heinz Tomato Ketchup",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      buttonText: "Shop Collection"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Banner */}
          <div className="lg:col-span-8">
            <div className="relative bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl overflow-hidden min-h-[500px]">
              <div className="relative h-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex items-center h-full p-8 lg:p-12">
                      <div className="flex-1 max-w-md">
                        <div className="text-primary text-lg font-medium mb-4">{slide.category}</div>
                        <h1 className="text-4xl lg:text-5xl font-heading font-bold text-dark mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-gray-600 mb-8 text-lg">{slide.description}</p>
                        <button className="bg-transparent border-2 border-dark text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-dark hover:text-white transition-all duration-300 transform hover:scale-105">
                          {slide.buttonText}
                        </button>
                      </div>
                      <div className="flex-1 flex justify-center items-center">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="max-w-full h-auto max-h-80 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronRight size={24} />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-primary' : 'bg-white bg-opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Banners */}
          <div className="lg:col-span-4 space-y-8">
            {/* Fruits & Vegetables Banner */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 min-h-[240px] relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-green-600 text-lg font-semibold mb-2">20% off</div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">Fruits & Vegetables</h3>
                <a href="#" className="inline-flex items-center text-dark hover:text-green-600 transition-colors">
                  Shop Collection <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-green-300 rounded-full opacity-30"></div>
            </div>

            {/* Baked Products Banner */}
            <div className="bg-gradient-to-br from-orange-100 to-red-200 rounded-3xl p-8 min-h-[240px] relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-red-600 text-lg font-semibold mb-2">15% off</div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">Baked Products</h3>
                <a href="#" className="inline-flex items-center text-dark hover:text-red-600 transition-colors">
                  Shop Collection <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-red-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;