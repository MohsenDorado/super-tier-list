// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-sm">
            We are a company dedicated to delivering the best products and services to our customers. Our mission is to bring innovation and quality to everything we do.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Our Services</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
            <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
            <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
            <li><a href="#" className="hover:text-gray-400">LinkedIn</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for updates and offers:
          </p>
          <form className="flex flex-col space-y-2">
            <input 
              type="email" 
              className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-gray-400"
              placeholder="Enter your email" 
            />
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto mt-8 border-t border-gray-600 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
