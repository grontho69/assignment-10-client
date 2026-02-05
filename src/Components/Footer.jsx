import React from 'react';
import { Link } from 'react-router';
import { Leaf, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">EcoReport</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your platform for reporting and tracking environmental and cleanliness issues in your community. Together, we can make our environment cleaner and better.
            </p>
          </div>

         
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/issues" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 text-sm">
                  All Issues
                </Link>
              </li>
              <li>
                <Link to="/add-issue" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 text-sm">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/my-contribution" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 text-sm">
                  My Contributions
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Issue Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">Garbage</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Illegal Construction</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Broken Public Property</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Road Damage</li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                support@ecoreport.com
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                123 Green Street, City
              </li>
            </ul>
            
          
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} EcoReport. All rights reserved. Made with ❤️ for a cleaner environment.<br/>Devloped by GRONTHO❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
