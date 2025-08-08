import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Clock } from "lucide-react";
import { dailyMenuService } from "../../services/api.service";

interface DishItem {
  name: string;
  description?: string;
}

interface MealDish {
  title: string;
  cost: number;
  category: "basic" | "premium" | "special";
  items: DishItem[];
  description: string;
  image?: string;
}

interface SetDailyMealsProps {
  isOpen: boolean;
  onClose: () => void;
  onMealsSet: () => void;
}

const SetDailyMeals: React.FC<SetDailyMealsProps> = ({
  isOpen,
  onClose,
  onMealsSet,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dishes, setDishes] = useState<MealDish[]>([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set current date
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);

    // Load existing meals for today if any
    loadTodaysMeals();
  }, []);

  const loadTodaysMeals = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const params = new URLSearchParams();
      params.append("date", today);
      
      const response = await dailyMenuService.getAllMenus(params);
      
      // Convert existing meals to dish format if needed
      if (response.data?.data?.length > 0) {
        console.log("Existing meals found for today:", response.data.data.length);
      }
    } catch (error) {
      console.error("Error loading today's meals:", error);
    }
  };

  const addNewDish = () => {
    const newDish: MealDish = {
      title: "",
      cost: 0,
      category: "basic",
      items: [{ name: "", description: "" }],
      description: "",
      image: "",
    };
    setDishes([...dishes, newDish]);
  };

  const removeDish = (dishIndex: number) => {
    setDishes(dishes.filter((_, index) => index !== dishIndex));
  };

  const updateDish = (
    dishIndex: number, 
    field: keyof MealDish, 
    value: string | number | DishItem[]
  ) => {
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex] = {
      ...updatedDishes[dishIndex],
      [field]: value,
    };
    setDishes(updatedDishes);
  };

  const addDishItem = (dishIndex: number) => {
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex].items.push({ name: "", description: "" });
    setDishes(updatedDishes);
  };

  const updateDishItem = (
    dishIndex: number,
    itemIndex: number,
    field: keyof DishItem,
    value: string
  ) => {
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex].items[itemIndex] = {
      ...updatedDishes[dishIndex].items[itemIndex],
      [field]: value,
    };
    setDishes(updatedDishes);
  };

  const removeDishItem = (dishIndex: number, itemIndex: number) => {
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex].items = updatedDishes[dishIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setDishes(updatedDishes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dishes.length === 0) {
      setError("Please add at least one dish");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Convert dishes to menuItems format
      const menuItems = dishes.map((dish) => ({
        name: dish.title,
        category: "main_course",
        description: dish.description,
        ingredients: dish.items
          .map((item) => item.name)
          .filter((name) => name.trim() !== ""),
        isVegan: false,
        isVegetarian: true,
        spiceLevel: "medium",
        preparationTime: 30,
      }));

      const menuData = {
        date: currentDate,
        mealType: "all_day",
        menuItems,
        pricing: {
          fullMeal:
            dishes.length > 0 ? Math.max(...dishes.map((d) => d.cost)) : 0,
          halfMeal:
            dishes.length > 0
              ? Math.max(...dishes.map((d) => d.cost)) * 0.7
              : 0,
          individualItems: dishes.map((dish) => ({
            itemName: dish.title,
            price: dish.cost,
          })),
        },
        availableQuantity: 100,
        status: "published",
        chef: "Kitchen Staff",
        preparationNotes: `Meal added for ${currentDate}`,
        allergens: [],
        tags: ["daily-special", "fresh"],
        // Set automatic deletion at midnight
        autoDeleteAt: new Date(
          new Date(currentDate).getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      await dailyMenuService.createMenu(menuData);

      onMealsSet();
      onClose();

      // Reset form
      setDishes([]);
      setError("");
    } catch (error: unknown) {
      setError(
        error instanceof Error && "response" in error && error.response
          ? (error.response as { data?: { message?: string } }).data?.message ||
              "Failed to add meal"
          : "Failed to add meal"
      );
      console.error("Error adding meal:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Meal
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <Clock className="inline w-4 h-4 mr-1" />
              For:{" "}
              {new Date(currentDate).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ These meals will automatically be removed at 12:00 AM tomorrow
            </p>
            <p className="text-xs text-blue-600 mt-1">
              💡 You can add multiple individual meals for the same day
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Dishes Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Meal Dishes
              </h3>
              <button
                type="button"
                onClick={addNewDish}
                className="flex items-center gap-2 bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-700 text-sm"
              >
                <Plus size={16} />
                Add Dish
              </button>
            </div>

            {dishes.map((dish, dishIndex) => (
              <div
                key={dishIndex}
                className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Dish {dishIndex + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeDish(dishIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dish Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={dish.title}
                      onChange={(e) =>
                        updateDish(dishIndex, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="e.g., Thali, Rice Bowl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={dish.cost}
                      onChange={(e) =>
                        updateDish(dishIndex, "cost", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={dish.category}
                      onChange={(e) =>
                        updateDish(
                          dishIndex,
                          "category",
                          e.target.value as "basic" | "premium" | "special"
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="special">Special</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={dish.description}
                    onChange={(e) =>
                      updateDish(dishIndex, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    rows={2}
                    placeholder="Brief description of the dish..."
                  />
                </div>

                {/* Dish Items */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-medium text-gray-700">
                      Dish Components
                    </h5>
                    <button
                      type="button"
                      onClick={() => addDishItem(dishIndex)}
                      className="flex items-center gap-1 text-amber-600 hover:text-amber-800 text-sm"
                    >
                      <Plus size={14} />
                      Add Component
                    </button>
                  </div>

                  {dish.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          updateDishItem(
                            dishIndex,
                            itemIndex,
                            "name",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                        placeholder="e.g., Chapati, Dal, Rice"
                      />
                      <button
                        type="button"
                        onClick={() => removeDishItem(dishIndex, itemIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {dishes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No dishes added yet</p>
                <button
                  type="button"
                  onClick={addNewDish}
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
                >
                  <Plus size={16} />
                  Add Your First Dish
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || dishes.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {loading ? "Adding Meal..." : "Add Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetDailyMeals;
