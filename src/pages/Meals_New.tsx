import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  ShoppingCart,
  Heart,
  Utensils,
  Leaf,
  Award,
  Zap,
} from "lucide-react";
import TodaysMeals from "../components/TodaysMeals";

interface Meal {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  time: string;
  description: string;
  tags: string[];
  caterer: string;
}

const Meals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Meals", icon: Utensils },
    { id: "regular", name: "Regular Tiffin", icon: Utensils },
    { id: "premium", name: "Premium Tiffin", icon: Heart },
    { id: "fasting", name: "Upawas Tiffin", icon: Award },
    { id: "jain", name: "Jain Tiffin", icon: Leaf },
    { id: "north-indian", name: "Mini North Indian Tiffin", icon: Star },
    { id: "south-indian", name: "Mini South Indian Tiffin", icon: Users },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Home-Style <span className="text-amber-600">Tiffins</span> Made
              With Love
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover our variety of freshly prepared tiffin services, crafted
              with the same care and nutrition that mumma would provide
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for meals..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meal Categories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-amber-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Meals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TodaysMeals />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-8">
            Contact us for custom meal plans or special dietary requirements.
            We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Custom Order
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-amber-600 transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meals;
