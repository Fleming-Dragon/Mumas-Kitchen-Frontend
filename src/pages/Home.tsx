import React from "react";
import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import {
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
  Star,
  Stethoscope,
  ChefHat,
} from "lucide-react";

const Home: React.FC = () => {
  const services = [
    {
      title: "Daily Home Tiffins",
      description:
        "Reliable home-style meals delivered daily by verified local caterers with Mumma's warmth",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      title: "Personalized Nutrition",
      description:
        "Customized meals for your health needs, dietary restrictions, and taste preferences",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Flexible Delivery Options",
      description:
        "Choose from home delivery, pickup points, or dine-in options for maximum convenience",
      icon: Stethoscope,
      color: "bg-purple-500",
    },
    {
      title: "Corporate & Bulk Orders",
      description:
        "Scalable solutions for offices, hospitals, student hostels, and large groups",
      icon: ChefHat,
      color: "bg-red-500",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Explore Caterers & Meals",
      description:
        "Browse a curated list of home-based and local caterers. View their menus, ratings, and available meal options.",
    },
    {
      step: "02",
      title: "Select Your Meal & Access Mode",
      description:
        "Choose your meal and decide how you want it — delivered to your home, picked up by you, or dine-in (if the caterer supports it).",
    },
    {
      step: "03",
      title: "Place Your Order & Pay",
      description:
        "Add items to your cart, select your preferred time slot, and pay online or opt for Cash on Delivery.",
    },
    {
      step: "04",
      title: "Enjoy Your Meal Your Way",
      description:
        "Relax at home, stop by and pick up, or dine in — your meal, your choice. Don’t forget to leave a review!",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      quote:
        "As a working professional, Mumma's Kitchen feels like having my mom's cooking delivered daily. The consistency and warmth in every meal is unmatched!",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Arjun Patel",
      rating: 5,
      quote:
        "Finally found a tiffin service that understands my dietary needs. The personalized meals have helped me maintain my health goals while studying.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Dr. Meera Singh",
      rating: 5,
      quote:
        "For our hospital patients, these light and nutritious meals are perfect. The caterers understand exactly what recovery meals should be like.",
      image:
        "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden h-fit">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Delicious food spread"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Home-Style Meals
              <span className="text-amber-600"> That Feel Like</span>
              <br />
              <span className="text-amber-600">Mumma's Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We didn't build just another food app. We built something that
              feels like home —
              <span className="font-bold text-amber-600">
                {" "}
                Reliable, Warm, Personal
              </span>
              . Connect with verified local caterers who deliver nutritious,
              home-style meals tailored to your taste and health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/meals"
                className="inline-flex items-center px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Find Your Tiffin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg border-2 border-amber-200 hover:bg-amber-50 transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Mumma's Kitchen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another food delivery app. We're a personalized
              catering platform designed for busy professionals, students,
              patients, and anyone who misses home-cooked meals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div
                    className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stories from Our Mumma's Kitchen Family
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from professionals, students, and families who
              found their perfect home-style meal solution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
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
            Ready to Experience Home-Style Meals?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands who've discovered that reliable, warm, and personal
            meals are just a click away with Mumma's Kitchen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/meals"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Start Your Tiffin Journey
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-amber-600 transition-all duration-200"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
