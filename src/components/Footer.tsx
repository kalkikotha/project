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
    <footer className="bg-bg-light pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Social */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a
                href="#"
                className="text-2xl font-heading font-bold text-brand"
              >
                IngView
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-text-inverted border border-ui-gray rounded-full flex items-center justify-center hover:bg-brand hover:text-text-inverted hover:border-brand transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-text-inverted border border-ui-gray rounded-full flex items-center justify-center hover:bg-brand hover:text-text-inverted hover:border-brand transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-text-inverted border border-ui-gray rounded-full flex items-center justify-center hover:bg-brand hover:text-text-inverted hover:border-brand transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-text-inverted border border-ui-gray rounded-full flex items-center justify-center hover:bg-brand hover:text-text-inverted hover:border-brand transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-text-inverted border border-ui-gray rounded-full flex items-center justify-center hover:bg-brand hover:text-text-inverted hover:border-brand transition-colors"
              >
                <ShoppingBag size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="font-semibold text-text-primary mb-4">About</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Our Testing Methods
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Research Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Data Integrity
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold text-text-primary mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Ingredient Glossary
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Safety Ratings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Testing Methodology
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-text-primary mb-4">Contact</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Submit Product
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Research Partnerships
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-brand transition-colors"
                >
                  Data Requests
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-ui-gray pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-text-secondary text-sm">
              © 2025 IngView. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;