import React from "react";
import { Link } from "react-router-dom";

const SearchTags = () => {
  const tags = [
    { name: "Vitamin C Serum", category: "Serums" },
    { name: "Hyaluronic Acid", category: "Serums" },
    { name: "Retinol Treatment", category: "Serums" },
    { name: "Niacinamide", category: "Serums" },
    { name: "Antioxidant Serum", category: "Serums" },
    { name: "Lightweight Lotion", category: "Lotions" },
    { name: "Shea Butter", category: "Lotions" },
    { name: "SPF Moisturizer", category: "Lotions" },
    { name: "After Sun Care", category: "Lotions" },
    { name: "Fragrance-Free", category: "Lotions" },
    { name: "Night Cream", category: "Creams" },
    { name: "BB Cream", category: "Creams" },
    { name: "Eczema Therapy", category: "Creams" },
    { name: "Brightening Cream", category: "Creams" },
    { name: "Volumizing Shampoo", category: "Shampoos" },
    { name: "Hydrating Shampoo", category: "Shampoos" },
    { name: "Dandruff Control", category: "Shampoos" },
    { name: "Charcoal Soap", category: "Soaps" },
    { name: "Castile Soap", category: "Soaps" },
    { name: "Goat Milk Soap", category: "Soaps" },
  ];

  return (
    <section className="py-6 md:py-16 bg-bg-light">
      <div className="container mx-auto px-4 md:px-12">
        <h2 className="text-2xl lg:text-4xl font-bold text-text-primary mb-8">
          Popular Skincare Ingredients
        </h2>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/products/${tag.category}`}
              className="bg-brand-light hover:bg-brand-DEFAULT hover:text-text-inverted text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchTags;