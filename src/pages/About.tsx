import React from "react";
import {
  Target,
  Eye,
  Users,
  TrendingUp,
  Award,
  Heart,
  CheckCircle,
  Star,
  Globe,
  Clock,
} from "lucide-react";

const About: React.FC = () => {
  const stats = [
    { number: "5,000+", label: "Students & Professionals", icon: Users },
    { number: "50+", label: "Partner Kitchens", icon: Award },
    { number: "25,000+", label: "Home-Style Meals", icon: TrendingUp },
    { number: "10+", label: "Cities Served", icon: Globe },
  ];

  const values = [
    {
      title: "Home-Style Quality",
      description:
        "Every meal is prepared with the same care and love that mumma puts into home cooking, using fresh ingredients and traditional recipes.",
      icon: Award,
      color: "bg-blue-500",
    },
    {
      title: "Personalized Nutrition",
      description:
        "We understand that every person has unique dietary needs. Our meals are customized to support your health goals and preferences.",
      icon: Heart,
      color: "bg-green-500",
    },
    {
      title: "Reliable Service",
      description:
        "Like the comfort of home, you can count on us. Consistent delivery times, quality, and care that never compromises.",
      icon: Clock,
      color: "bg-purple-500",
    },
    {
      title: "Community First",
      description:
        "Supporting local home cooks and creating a network of care that extends beyond just food delivery to genuine community support.",
      icon: Users,
      color: "bg-amber-500",
    },
  ];

  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "A nutrition enthusiast who believes food is medicine and every meal should nourish both body and soul.",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Ensures every tiffin reaches our community with the same care as if mumma packed it herself.",
    },
    {
      name: "Anita Patel",
      role: "Head of Quality",
      image:
        "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Dedicated to maintaining the home-style quality and nutritional value in every meal we serve.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="About us background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-amber-600">Mumma's Kitchen</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We didn't build a Zomato 2.0. We built something that feels like
              home — Reliable, Warm, Personal. A personalized catering platform
              designed to deliver the comfort and nutrition your mumma would
              want for you.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-amber-500 p-3 rounded-lg mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide reliable, warm, and personal meal experiences that
                support the health and well-being of students, working
                professionals, and patients. We believe food is medicine,
                comfort, and connection — just like mumma always said.
              </p>
              <div className="flex items-center text-amber-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  Bringing home closer since 2020
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-lg mr-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become the most trusted food companion for busy individuals
                who don't want to compromise on nutrition or taste. We envision
                a future where technology brings the warmth and care of home
                cooking to everyone, everywhere — because everyone deserves to
                eat like mumma is watching.
              </p>
              <div className="flex items-center text-blue-600">
                <Star className="h-5 w-5 mr-2 fill-current" />
                <span className="font-medium">
                  "Catering, Reimagined" — Our brand motto
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real impact in the lives of students, professionals, and families
              who choose Mumma's Kitchen
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we
              make
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-6 p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div
                    className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How we bring the warmth of home to busy lives through thoughtful
              service
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-lg mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Our Community
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Home-style meals that support health goals of students and
                    working professionals
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Flexible tiffin services with home delivery, pickup, and
                    dine-in options
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Personalized nutrition planning for patients and
                    health-conscious individuals
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Reliable meal scheduling that fits busy lifestyles and
                    demanding schedules
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-amber-500 p-3 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Kitchen Partners
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Opportunity to share home-style cooking with a wider
                    community
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Streamlined operations with our technology platform and
                    support
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Fair partnership terms that respect the value of quality
                    home cooking
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Community building opportunities to connect with
                    health-conscious customers
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals bringing home-style care to every meal
              and every customer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Mumma's Kitchen Family
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking for the comfort of home-style meals or want
            to share your cooking with our community, we're here to support your
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/meals"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Start Your Tiffin Journey
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-amber-600 transition-all duration-200"
            >
              <Award className="mr-2 h-5 w-5" />
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
