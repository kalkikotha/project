import React from 'react';

const SearchTags = () => {
  const tags = [
    "Blue diamond almonds",
    "Angie's Boomchickapop Corn",
    "Salty kettle Corn",
    "Chobani Greek Yogurt",
    "Sweet Vanilla Yogurt",
    "Foster Farms Takeout Crispy wings",
    "Warrior Blend Organic",
    "Chao Cheese Creamy",
    "Chicken meatballs",
    "Organic Quinoa",
    "Fresh Avocados",
    "Coconut Water",
    "Protein Bars",
    "Almond Butter",
    "Green Tea",
    "Dark Chocolate",
    "Olive Oil",
    "Honey Granola"
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark mb-8">
          People are also looking for
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <a
              key={index}
              href="#"
              className="bg-primary-50 hover:bg-primary hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchTags;