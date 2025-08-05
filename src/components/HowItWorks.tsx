import React from "react";
import { Link } from "react-router-dom";
import { Search, Utensils, CreditCard, Heart } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Discover & Browse",
      description:
        "Explore our curated selection of local caterers and view their specialties, ratings, and authentic home-style menus.",
      icon: Search,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      step: "02",
      title: "Customize & Select",
      description:
        "Choose your preferred meals, dietary options, delivery method (home delivery, pickup, or dine-in), and time slots.",
      icon: Utensils,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      step: "03",
      title: "Order & Pay Securely",
      description:
        "Add items to your cart, review your order, and complete payment using our secure online system or choose Cash on Delivery.",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      step: "04",
      title: "Enjoy & Review",
      description:
        "Receive your fresh, delicious meals exactly when you want them and share your experience with our community.",
      icon: Heart,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting delicious meals delivered is simple with our streamlined,
            user-friendly process designed for your convenience
          </p>
        </div>

        {/* Timeline Design */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 to-orange-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Mobile Timeline Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative ${step.bgColor} rounded-2xl p-6 h-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10`}
                  >
                    {/* Step Number & Icon */}
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-md border-2 border-gray-100">
                        {step.step}
                      </div>

                      {/* Desktop Timeline Connector */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-10 left-full w-full h-0.5">
                          <div
                            className={`h-full bg-gradient-to-r ${step.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                          ></div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>

                    {/* Subtle Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-700 font-medium">
                Join thousands of satisfied customers!
              </span>
              <Link
                to="/meals"
                className="bg-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition-colors duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
