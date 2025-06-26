import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  ShoppingBag,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Social */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a
                href="#"
                className="text-2xl font-heading font-bold text-primary"
              >
                Wethenticate
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <ShoppingBag size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="font-semibold text-dark mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Our Journals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Affiliate Programme
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Ultras Press
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-semibold text-dark mb-4">Customer Service</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Cookie Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Delivery Information
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-semibold text-dark mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Live Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Order Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h5 className="font-semibold text-dark mb-4">Subscribe Us</h5>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to get updates about our grand offers.
            </p>
            <form className="flex gap-0">
              <input
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                type="email"
                placeholder="Email Address"
              />
              <button className="px-6 py-3 bg-dark text-white rounded-r-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 Wethenticate. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
