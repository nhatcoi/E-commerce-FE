import React from "react";
import { Link } from "react-router-dom";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Separator } from "src/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  ShoppingBag, 
  CreditCard, 
  Truck, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Heart
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links
  const categories = [
    { name: "Electronics", href: "/shop?category=electronics" },
    { name: "Clothing", href: "/shop?category=clothing" },
    { name: "Home & Garden", href: "/shop?category=home" },
    { name: "Beauty", href: "/shop?category=beauty" },
    { name: "Sports", href: "/shop?category=sports" }
  ];
  
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" }
  ];
  
  const customerService = [
    { name: "My Account", href: "/account" },
    { name: "Track Order", href: "/orders/track" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Policy", href: "/shipping" }
  ];
  
  const paymentMethods = [
    { name: "Visa", image: "/assets/payment/visa.png" },
    { name: "Mastercard", image: "/assets/payment/mastercard.png" },
    { name: "PayPal", image: "/assets/payment/paypal.png" },
    { name: "Apple Pay", image: "/assets/payment/applepay.png" }
  ];

  // Footer features
  const features = [
    { 
      icon: <Truck className="h-6 w-6" />, 
      title: "Free Shipping",
      description: "On all orders over $50"
    },
    { 
      icon: <CreditCard className="h-6 w-6" />, 
      title: "Secure Payment",
      description: "100% secure payment"
    },
    { 
      icon: <ShoppingBag className="h-6 w-6" />, 
      title: "Quality Products",
      description: "Premium quality items"
    }
  ];

  return (
    <footer className="bg-gray-50 border-t">

      
      {/* Newsletter section */}
      <div className="bg-gray-100 py-14 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">Stay updated with our latest offers and promotions</p>
            
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1"
              />
              <Button type="submit" className="group bg-black hover:bg-gray-800 text-white">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 text-black hover:text-black hover:opacity-75 transition-all">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xl font-bold">JackieShop</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              JackieShop is your one-stop destination for all things fashion, electronics, and lifestyle. We bring you the best products from around the world at competitive prices.
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://maps.google.com/?q=123+Shopping+Street,+Commerce+City,+Country" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-black transition-colors group"
              >
                <MapPin className="h-5 w-5 text-black flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">123 Shopping Street, Commerce City, Country</span>
              </a>
              <a 
                href="tel:+84376696037" 
                className="flex items-center space-x-3 hover:text-black transition-colors group"
              >
                <Phone className="h-5 w-5 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">+84 (0)37 6696 037</span>
              </a>
              <a 
                href="mailto:contact@jackieshop.com" 
                className="flex items-center space-x-3 hover:text-black transition-colors group"
              >
                <Mail className="h-5 w-5 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">contact@jackieshop.com</span>
              </a>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Link to="#" className="p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link to="#" className="p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link to="#" className="p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link to="#" className="p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={category.href}
                    className="text-muted-foreground hover:text-black hover:translate-x-1 transition-all inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-black hover:translate-x-1 transition-all inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href}
                    className="text-muted-foreground hover:text-black hover:translate-x-1 transition-all inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="border-t">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} JackieShop. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1">
              {paymentMethods.map((method, index) => (
                <div key={index} className="px-2">
                  <img 
                    src={method.image} 
                    alt={method.name} 
                    className="h-8 object-contain" 
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='14' x='2' y='5' rx='2'/%3E%3Cline x1='2' x2='22' y1='10' y2='10'/%3E%3C/svg%3E";
                      e.target.alt = "Payment method";
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span>Made with </span>
              <Heart className="inline h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
              <span> by Jackie</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;