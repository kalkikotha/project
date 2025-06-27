import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slides = [
    {
      category: "Premium Skincare",
      title: "Clinical-Grade Serums",
      description:
        "Targeted treatments for brightening, hydration & anti-aging",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
      buttonText: "Explore Serums",
      categoryType: "Serums",
    },
    {
      category: "Daily Essentials",
      title: "Hydrating Lotions",
      description: "Lightweight formulas for all skin types & needs",
      image:
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      buttonText: "Explore Lotions",
      categoryType: "Lotions",
    },
    {
      category: "Specialty Care",
      title: "Rich Creams",
      description: "Intensive treatments for overnight recovery",
      image: "https://images.unsplash.com/photo-1629732097571-b042b35aa3ed",
      buttonText: "Explore Creams",
      categoryType: "Creams",
    },
    {
      category: "Hair Wellness",
      title: "Nourishing Shampoos",
      description: "Formulated for different hair types & concerns",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
      buttonText: "Explore Shampoos",
      categoryType: "Shampoos",
    },
    {
      category: "Gentle Cleansing",
      title: "Natural Soaps",
      description: "Plant-based formulas for sensitive skin",
      image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec",
      buttonText: "Explore Soaps",
      categoryType: "Soaps",
    },
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
    <section className="py-12 ">
      <div className="container mx-auto ">
        {/* Main Carousel */}
        <div className="mb-16">
          <div className="relative bg-white rounded-3xl overflow-hidden min-h-[500px] shadow-lg">
            <div className="relative h-[800px] lg:h-[500px]">
              {" "}
              {/* Fix height here */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full">
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-20 flex flex-col justify-center">
                      <div className="text-primary text-lg font-medium mb-4">
                        {slide.category}
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-gray-600 mb-8 text-lg">
                        {slide.description}
                      </p>
                      <button
                        onClick={() => navigate(`/products/${slide.categoryType}`)}
                        className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 w-fit"
                      >
                        {slide.buttonText}
                      </button>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover object-center rounded-l-none rounded-r-3xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200 z-20"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200 z-20"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
