import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Calendar,
  Search,
  Edit,
  Trash2,
  Eye,
  ChefHat,
} from "lucide-react";
import CreateMenuForm from "./CreateMenuForm";
import SetDailyMeals from "./SetDailyMeals";
import { dailyMenuService } from "../../services/api.service";

interface MenuItem {
  name: string;
  category: string;
  description?: string;
  ingredients?: string[];
  spiceLevel?: "mild" | "medium" | "hot" | "very_hot";
  isVegan?: boolean;
  isVegetarian?: boolean;
}

interface DailyMenu {
  _id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "all_day";
  menuItems: MenuItem[];
  pricing: {
    fullMeal: number;
    halfMeal?: number;
  };
  availableQuantity: number;
  soldQuantity: number;
  status: "draft" | "published" | "sold_out" | "archived";
  chef?: string;
  remainingQuantity: number;
  createdBy?: {
    firstName: string;
    lastName: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [menus, setMenus] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    date: "",
    mealType: "",
    status: "",
    search: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSetMealsModal, setShowSetMealsModal] = useState(false);

  const fetchMenus = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filter.date) queryParams.append("date", filter.date);
      if (filter.mealType) queryParams.append("mealType", filter.mealType);
      if (filter.status) queryParams.append("status", filter.status);

      const response = await dailyMenuService.getAllMenus(queryParams);
      setMenus(response.data.data || []);
    } catch (error) {
      console.error("Error fetching menus:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleStatusUpdate = async (menuId: string, newStatus: string) => {
    try {
      await dailyMenuService.updateMenuStatus(menuId, newStatus);
      fetchMenus(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (menuId: string) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await dailyMenuService.deleteMenu(menuId);
        fetchMenus(); // Refresh the list
      } catch (error) {
        console.error("Error deleting menu:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "sold_out":
        return "bg-red-100 text-red-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Daily Menu Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage daily menus for Mama's Kitchen
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSetMealsModal(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <ChefHat size={20} />
                Set Daily Meals
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus size={20} />
                Create New Menu
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Type
              </label>
              <select
                value={filter.mealType}
                onChange={(e) =>
                  setFilter({ ...filter, mealType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">All Meal Types</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="all_day">All Day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="sold_out">Sold Out</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menus..."
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading menus...</p>
            </div>
          ) : menus.length === 0 ? (
            <div className="p-6 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No menus found
              </h3>
              <p className="text-gray-600">
                Create your first daily menu to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Meal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menu Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pricing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menus.map((menu) => (
                    <tr key={menu._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(menu.date)}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {menu.mealType.replace("_", " ")}
                          </div>
                          {menu.chef && (
                            <div className="text-xs text-gray-400">
                              Chef: {menu.chef}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm text-gray-900">
                            {menu.menuItems.slice(0, 3).map((item, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {item.name}
                              </span>
                            ))}
                            {menu.menuItems.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{menu.menuItems.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Full: ₹{menu.pricing.fullMeal}
                        </div>
                        {menu.pricing.halfMeal && (
                          <div className="text-sm text-gray-500">
                            Half: ₹{menu.pricing.halfMeal}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {menu.remainingQuantity}/{menu.availableQuantity}
                        </div>
                        <div className="text-xs text-gray-500">
                          Sold: {menu.soldQuantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={menu.status}
                          onChange={(e) =>
                            handleStatusUpdate(menu._id, e.target.value)
                          }
                          className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(
                            menu.status
                          )}`}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="sold_out">Sold Out</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="text-amber-600 hover:text-amber-900"
                            title="Edit Menu"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(menu._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Menu"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <CreateMenuForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onMenuCreated={() => {
          setShowCreateModal(false);
          fetchMenus();
        }}
      />

      {/* Set Daily Meals Modal */}
      <SetDailyMeals
        isOpen={showSetMealsModal}
        onClose={() => setShowSetMealsModal(false)}
        onMealsSet={() => {
          setShowSetMealsModal(false);
          fetchMenus(); // Refresh the menu list
        }}
      />
    </div>
  );
};

export default AdminDashboard;
