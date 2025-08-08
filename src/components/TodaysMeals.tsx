import React, { useState, useEffect } from "react";
import { Clock, Tag, AlertCircle, RefreshCw, Utensils } from "lucide-react";
import { publicMealsService } from "../services/api.service";

interface DailyMeal {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
  isVegan: boolean;
  isVegetarian: boolean;
  spiceLevel: string;
  preparationTime: number;
  nutritionalInfo?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  allergens: string[];
  tags: string[];
  availableUntil: string;
  mealType: string;
}

interface TodaysMealsResponse {
  meals: DailyMeal[];
  date: string;
  totalMeals: number;
  lastUpdated: string;
}

const TodaysMeals: React.FC = () => {
  const [meals, setMeals] = useState<DailyMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<
    { category: string; count: number }[]
  >([]);

  useEffect(() => {
    fetchTodaysMeals();
    fetchCategories();
  }, []);

  const fetchTodaysMeals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await publicMealsService.getTodaysMeals();
      const data: TodaysMealsResponse = response.data.data;

      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching today's meals:", error);
      setError("Unable to load today's meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await publicMealsService.getMealCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredMeals =
    selectedCategory === "all"
      ? meals
      : meals.filter((meal) => meal.category === selectedCategory);

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case "mild":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-amber-600 bg-amber-100";
      case "hot":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="animate-spin mr-2" size={20} />
          <span>Loading today's fresh meals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="mr-2" size={20} />
          <span className="font-medium">Error Loading Meals</span>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchTodaysMeals}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Utensils className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Meals Available Today
        </h3>
        <p className="text-gray-600 mb-4">
          We're working on preparing fresh meals for today. Please check back
          later!
        </p>
        <button
          onClick={fetchTodaysMeals}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <RefreshCw className="inline mr-2" size={16} />
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Today's Fresh Meals</h2>
        <p className="text-amber-100">
          Prepared fresh today •{" "}
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-4 flex items-center text-amber-100">
          <Clock className="mr-2" size={16} />
          <span>Available until midnight • Auto-updated daily</span>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({meals.length})
            </button>
            {categories.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {formatCategory(category)} ({count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {meal.title}
                </h3>
                <span className="text-xl font-bold text-amber-600">
                  ₹{meal.price}
                </span>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{meal.description}</p>

              {/* Tags and Info */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {meal.isVegetarian && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🌱 Vegetarian
                    </span>
                  )}
                  {meal.isVegan && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🌿 Vegan
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSpiceLevelColor(
                      meal.spiceLevel
                    )}`}
                  >
                    🌶️ {meal.spiceLevel}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1" size={14} />
                  <span>{meal.preparationTime} mins</span>
                  <span className="mx-2">•</span>
                  <Tag className="mr-1" size={14} />
                  <span>{formatCategory(meal.category)}</span>
                </div>

                {/* Ingredients */}
                {meal.ingredients.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Includes:
                    </p>
                    <p className="text-sm text-gray-600">
                      {meal.ingredients.slice(0, 4).join(", ")}
                      {meal.ingredients.length > 4 &&
                        ` +${meal.ingredients.length - 4} more`}
                    </p>
                  </div>
                )}

                {/* Nutritional Info */}
                {meal.nutritionalInfo?.calories && (
                  <div className="text-sm text-gray-500">
                    <span>🔥 {meal.nutritionalInfo.calories} cal</span>
                    {meal.nutritionalInfo.protein && (
                      <span className="ml-3">
                        💪 {meal.nutritionalInfo.protein} protein
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMeals.length === 0 && selectedCategory !== "all" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">
            No meals available in the "{formatCategory(selectedCategory)}"
            category today.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
          >
            View All Meals
          </button>
        </div>
      )}
    </div>
  );
};

export default TodaysMeals;
