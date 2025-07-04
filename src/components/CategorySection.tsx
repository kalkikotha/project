import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { productsData } from "./data";
import { categories } from "./data";

const CategorySection = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-6 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-between items-center mb-4 md:mb-12 gap-2">
          <h2 className=" text-2xl lg:text-4xl font-heading font-bold text-text-primary">
            Our Skincare Categories
          </h2>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-text-secondary hover:text-brand-DEFAULT transition-colors font-medium"
            >
              View All Categories{" "}
              <ArrowRight className="inline ml-1" size={16} />
            </a>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 bg-bg-dark hover:bg-brand-DEFAULT hover:text-text-inverted rounded-lg flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 bg-bg-dark hover:bg-brand-DEFAULT hover:text-text-inverted rounded-lg flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 -mx-4 scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex gap-4 md:gap-6 flex-nowrap">
            {categories.map((category, index) => (
              <Link
                to={`/products/${category.name}`}
                key={index}
                className="group bg-bg-DEFAULT border border-ui-gray rounded-2xl p-4 md:p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex-shrink-0"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  scrollSnapAlign: "start",
                }}
              >
                <div className="w-24 h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-base font-semibold text-text-primary group-hover:text-brand-DEFAULT transition-colors">
                  {category.name}
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  {productsData[category.name].length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
