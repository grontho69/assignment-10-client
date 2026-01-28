import React from 'react'
import { Trash2, Building, Wrench, Car, AlertCircle, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router';


const categories = [
  {
    name: 'Garbage',
    icon: Trash2,
    description: 'Report garbage accumulation and waste management issues',
    color: 'text-orange-600 dark:text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    name: 'Illegal Construction',
    icon: Building,
    description: 'Report unauthorized construction activities',
    color: 'text-red-600 dark:text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    name: 'Broken Public Property',
    icon: Wrench,
    description: 'Report damaged public infrastructure',
    color: 'text-blue-600 dark:text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    name: 'Road Damage',
    icon: Car,
    description: 'Report potholes, waterlogging, and road issues',
    color: 'text-purple-600 dark:text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
];
const Home = () => {
   const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };
  const bannerSlides = [
    {
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200',
      title: 'Report Environmental Issues',
      subtitle: 'Make your community cleaner and better'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2021/11/20/02/50/waste-management-6810733_1280.jpg',
      title: 'Community Driven Solutions',
      subtitle: 'Together we can create lasting change'
    },
    {
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
      title: 'Track and Contribute',
      subtitle: 'Monitor progress and support cleanup efforts'
    }
  ];

  return (
    <div>
       {/* Banner Section with Slider */}
      <section className="relative">
        <Slider {...sliderSettings}>
          {bannerSlides.map((slide, index) => (
            <div key={index} className="relative">
              <div className="relative h-125 md:h-150">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50"></div>
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                  <div className="text-white max-w-2xl">
                    <h1 className="text-4xl md:text-6xl mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                    <div className="text-2xl md:text-3xl text-green-400 mb-8 h-12">
                      <Typewriter
                        words={['Report Issues', 'Track Progress', 'Make Impact', 'Build Community']}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </div>
                    <Link to="/add-issue">
                      <button
                        className="bg-green-600 hover:bg-green-700 btn btn-lg btn-primarytext-white">
                        Report an Issue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

            {/* Category Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 dark:text-white">Issue Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">Choose a category to report an issue</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="card hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500">
                  <div className="card-content">
                    <div className={`${category.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 dark:text-white">Join Our Volunteer Program</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of the solution! Join our cleanup drives and community initiatives to make a real difference in your neighborhood.
          </p>
          <Link to="/register">
            <button className="btn btn-lg btn-primary">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
