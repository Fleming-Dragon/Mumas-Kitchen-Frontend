import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { dailyMenuService } from "../../services/api.service";

interface MenuItem {
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  spiceLevel: "mild" | "medium" | "hot" | "very_hot";
  isVegan: boolean;
  isVegetarian: boolean;
  preparationTime?: number;
}

interface SpecialOffer {
  title: string;
  description: string;
  discount: number;
  validUntil?: string;
}

interface CreateMenuFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuCreated: () => void;
}

const CreateMenuForm: React.FC<CreateMenuFormProps> = ({
  isOpen,
  onClose,
  onMenuCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    mealType: "lunch" as "breakfast" | "lunch" | "dinner" | "all_day",
    menuItems: [] as MenuItem[],
    specialOffers: [] as SpecialOffer[],
    pricing: {
      fullMeal: 0,
      halfMeal: 0,
      individualItems: [] as { itemName: string; price: number }[],
    },
    availableQuantity: 50,
    chef: "",
    preparationNotes: "",
    allergens: [] as string[],
    tags: [] as string[],
    status: "draft" as "draft" | "published",
  });

  const categoryOptions = [
    { value: "main_course", label: "Main Course" },
    { value: "bread", label: "Bread (Roti/Chapati)" },
    { value: "vegetable", label: "Vegetable (Sabzi)" },
    { value: "salad", label: "Salad" },
    { value: "rice", label: "Rice" },
    { value: "dal", label: "Dal" },
    { value: "dessert", label: "Dessert" },
    { value: "beverage", label: "Beverage" },
    { value: "snack", label: "Snack" },
    { value: "other", label: "Other" },
  ];

  const spiceLevelOptions = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "hot", label: "Hot" },
    { value: "very_hot", label: "Very Hot" },
  ];

  const allergenOptions = [
    "nuts",
    "dairy",
    "gluten",
    "soy",
    "eggs",
    "shellfish",
    "fish",
    "sesame",
  ];

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menuItems: [
        ...formData.menuItems,
        {
          name: "",
          category: "main_course",
          description: "",
          ingredients: [""],
          spiceLevel: "medium",
          isVegan: false,
          isVegetarian: true,
          preparationTime: 0,
        },
      ],
    });
  };

  const removeMenuItem = (index: number) => {
    const newItems = formData.menuItems.filter((_, i) => i !== index);
    setFormData({ ...formData, menuItems: newItems });
  };

  const updateMenuItem = (
    index: number,
    field: keyof MenuItem,
    value: string | number | boolean | string[]
  ) => {
    const newItems = [...formData.menuItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, menuItems: newItems });
  };

  const addIngredient = (itemIndex: number) => {
    const newItems = [...formData.menuItems];
    newItems[itemIndex].ingredients.push("");
    setFormData({ ...formData, menuItems: newItems });
  };

  const updateIngredient = (
    itemIndex: number,
    ingredientIndex: number,
    value: string
  ) => {
    const newItems = [...formData.menuItems];
    newItems[itemIndex].ingredients[ingredientIndex] = value;
    setFormData({ ...formData, menuItems: newItems });
  };

  const removeIngredient = (itemIndex: number, ingredientIndex: number) => {
    const newItems = [...formData.menuItems];
    newItems[itemIndex].ingredients = newItems[itemIndex].ingredients.filter(
      (_, i) => i !== ingredientIndex
    );
    setFormData({ ...formData, menuItems: newItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Filter out empty ingredients
      const cleanedMenuItems = formData.menuItems.map((item) => ({
        ...item,
        ingredients: item.ingredients.filter((ing) => ing.trim() !== ""),
      }));

      const menuData = {
        ...formData,
        menuItems: cleanedMenuItems,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
      };

      const response = await dailyMenuService.createMenu(menuData);

      if (response.status === 200 || response.status === 201) {
        onMenuCreated();
        onClose();
        // Reset form
        setFormData({
          date: "",
          mealType: "lunch",
          menuItems: [],
          specialOffers: [],
          pricing: {
            fullMeal: 0,
            halfMeal: 0,
            individualItems: [],
          },
          availableQuantity: 50,
          chef: "",
          preparationNotes: "",
          allergens: [],
          tags: [],
          status: "draft",
        });
      } else {
        setError(response.data?.message || "Failed to create menu");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error creating menu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Daily Menu
          </h2>
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

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.mealType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mealType: e.target.value as
                      | "breakfast"
                      | "lunch"
                      | "dinner"
                      | "all_day",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="all_day">All Day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.availableQuantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableQuantity: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Menu Items</h3>
              <button
                type="button"
                onClick={addMenuItem}
                className="flex items-center gap-2 bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-700 text-sm"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            {formData.menuItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Item {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) =>
                        updateMenuItem(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="e.g., Chapati, Mixed Vegetable, Green Salad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={item.category}
                      onChange={(e) =>
                        updateMenuItem(index, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateMenuItem(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    rows={2}
                    placeholder="Brief description of the item..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spice Level
                    </label>
                    <select
                      value={item.spiceLevel}
                      onChange={(e) =>
                        updateMenuItem(index, "spiceLevel", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    >
                      {spiceLevelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prep Time (mins)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.preparationTime || ""}
                      onChange={(e) =>
                        updateMenuItem(
                          index,
                          "preparationTime",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.isVegetarian}
                        onChange={(e) =>
                          updateMenuItem(
                            index,
                            "isVegetarian",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      Vegetarian
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.isVegan}
                        onChange={(e) =>
                          updateMenuItem(index, "isVegan", e.target.checked)
                        }
                        className="mr-2"
                      />
                      Vegan
                    </label>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Ingredients
                    </label>
                    <button
                      type="button"
                      onClick={() => addIngredient(index)}
                      className="text-amber-600 hover:text-amber-800 text-sm"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  {item.ingredients.map((ingredient, ingredientIndex) => (
                    <div
                      key={ingredientIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          updateIngredient(
                            index,
                            ingredientIndex,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                        placeholder="e.g., Wheat flour, Onions, Tomatoes"
                      />
                      {item.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeIngredient(index, ingredientIndex)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {formData.menuItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No menu items added yet. Click "Add Item" to start creating
                  your menu.
                </p>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Meal Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.pricing.fullMeal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData.pricing,
                        fullMeal: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Half Meal Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricing.halfMeal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData.pricing,
                        halfMeal: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chef Name
              </label>
              <input
                type="text"
                value={formData.chef}
                onChange={(e) =>
                  setFormData({ ...formData, chef: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Chef responsible for this menu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Notes
            </label>
            <textarea
              value={formData.preparationNotes}
              onChange={(e) =>
                setFormData({ ...formData, preparationNotes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              rows={3}
              placeholder="Special preparation instructions, cooking notes, etc."
            />
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergens
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allergenOptions.map((allergen) => (
                <label key={allergen} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allergens.includes(allergen)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          allergens: [...formData.allergens, allergen],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          allergens: formData.allergens.filter(
                            (a) => a !== allergen
                          ),
                        });
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize">{allergen}</span>
                </label>
              ))}
            </div>
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
              disabled={loading || formData.menuItems.length === 0}
              className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
