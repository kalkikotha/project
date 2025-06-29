import React from "react";
import { Shield, Award, MapPin, Gift } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Lab-Verified Results",
      description: "All test data comes from certified laboratories with strict quality control standards.",
    },
    {
      icon: Award,
      title: "Scientific Accuracy",
      description: "Independent testing ensures unbiased, reliable comparisons of cosmetic formulations.",
    },
    {
      icon: MapPin,
      title: "Ingredient Transparency",
      description: "Complete breakdown of components with verified test results for each product.",
    },
    {
      icon: Gift,
      title: "Expert Recommendations",
      description: "Data-driven suggestions based on clinical test outcomes for your skin type.",
    },
  ];

  return (
    <section className="py-16 bg-bg-light">
      <div className="container mx-auto px-4 md:px-12 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center lg:text-left">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                      <IconComponent size={24} className="text-text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h5>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;