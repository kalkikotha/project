import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { categories } from "./data";
import { Link } from "react-router-dom";


const CategorySection = () => {

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">
            Category
          </h2>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              View All Categories{" "}
              <ArrowRight className="inline ml-1" size={16} />
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/products/${category.name}`}
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
