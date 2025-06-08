import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Check, 
  X,
  ShoppingCart,
  Heart,
  Utensils,
  Leaf,
  Award,
  Zap
} from 'lucide-react';

const Meals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('student');

  const categories = [
    { id: 'all', name: 'All Meals', icon: Utensils },
    { id: 'regular', name: 'Regular Thali', icon: Utensils },
    { id: 'mini', name: 'Mini Meal', icon: Heart },
    { id: 'special', name: 'Special Meal', icon: Award },
    { id: 'diet', name: 'Diet Meal', icon: Leaf },
    { id: 'custom', name: 'Custom Meal', icon: Star },
    { id: 'family', name: 'Family Pack', icon: Users },
  ];

  const plans = [
    {
      id: 'student',
      name: 'Student Plan',
      price: '₹99',
      period: '/month',
      description: 'Perfect for students with budget-friendly options',
      features: [
        'Fixed daily menu',
        'Student ID verification required',
        'Basic meal options',
        'Standard delivery',
        'Email support',
        'No customization'
      ],
      notIncluded: [
        'Premium meals',
        'Priority delivery',
        'Phone support',
        'Meal customization'
      ],
      popular: false,
      color: 'border-blue-200 bg-blue-50',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'regular',
      name: 'Non-Student Plan',
      price: '₹199',
      period: '/month',
      description: 'Full access with premium features and flexibility',
      features: [
        'Flexible menu selection',
        'Premium meal options',
        'Priority delivery',
        'Meal customization',
        '24/7 phone support',
        'Add-on options',
        'Weekend specials',
        'Loyalty rewards'
      ],
      notIncluded: [],
      popular: true,
      color: 'border-amber-200 bg-amber-50',
      buttonColor: 'bg-amber-500 hover:bg-amber-600',
    },
  ];

  const meals = [
    {
      id: 1,
      name: 'Classic Punjabi Thali',
      category: 'regular',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 149,
      rating: 4.8,
      reviews: 234,
      time: '25-30 min',
      description: 'Authentic Punjabi flavors with dal, sabzi, roti, rice, and pickle',
      tags: ['Vegetarian', 'North Indian', 'Spicy'],
      caterer: 'Sharma Kitchen',
    },
    {
      id: 2,
      name: 'Healthy Bowl',
      category: 'diet',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 129,
      rating: 4.6,
      reviews: 156,
      time: '20-25 min',
      description: 'Nutritious mix of quinoa, grilled vegetables, and lean protein',
      tags: ['Healthy', 'Low Carb', 'Protein Rich'],
      caterer: 'FitFood Co.',
    },
    {
      id: 3,
      name: 'Mini South Indian',
      category: 'mini',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 89,
      rating: 4.7,
      reviews: 189,
      time: '15-20 min',
      description: 'Compact portion with sambar, rasam, rice, and coconut chutney',
      tags: ['South Indian', 'Light Meal', 'Traditional'],
      caterer: 'Chennai Express',
    },
    {
      id: 4,
      name: 'Royal Biryani Special',
      category: 'special',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 249,
      rating: 4.9,
      reviews: 312,
      time: '35-40 min',
      description: 'Premium basmati rice with tender meat, saffron, and aromatic spices',
      tags: ['Non-Vegetarian', 'Premium', 'Aromatic'],
      caterer: 'Biryani Palace',
    },
    {
      id: 5,
      name: 'Custom Protein Bowl',
      category: 'custom',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 179,
      rating: 4.5,
      reviews: 98,
      time: '30-35 min',
      description: 'Build your own bowl with choice of protein, grains, and toppings',
      tags: ['Customizable', 'Healthy', 'Fresh'],
      caterer: 'Build Bowl',
    },
    {
      id: 6,
      name: 'Family Feast Pack',
      category: 'family',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      price: 599,
      rating: 4.8,
      reviews: 145,
      time: '45-50 min',
      description: 'Complete meal for 4 people with variety of dishes and dessert',
      tags: ['Family Size', 'Variety', 'Value Pack'],
      caterer: 'Family Kitchen',
    },
  ];

  const filteredMeals = selectedCategory === 'all' 
    ? meals 
    : meals.filter(meal => meal.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delicious <span className="text-amber-600">Meals</span> Await
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose from our variety of freshly prepared meals, crafted by local caterers with love and care
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
                      ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      {/* Plan Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 border-2 ${plan.color} ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-center opacity-50">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${plan.buttonColor}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Meals' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {meal.caterer}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-200">
                      {meal.name}
                    </h3>
                    <span className="text-2xl font-bold text-amber-600">₹{meal.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{meal.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700">{meal.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({meal.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{meal.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-200 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Contact us for custom meal plans or special dietary requirements. We're here to help!
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