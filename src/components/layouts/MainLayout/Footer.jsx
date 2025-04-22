import React from "react";
import { Link } from "react-router-dom";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Separator } from "src/components/ui/separator";
import { footerData } from "src/data/layouts/footer";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
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

  // Icon mapping for features
  const featureIcons = {
    "Free Shipping": <Truck className="h-6 w-6" />,
    "Secure Payment": <CreditCard className="h-6 w-6" />,
    "Quality Products": <ShoppingBag className="h-6 w-6" />
  };

  // Icon mapping for social media
  const socialIcons = {
    "Facebook": <Facebook className="h-4 w-4" />,
    "Twitter": <Twitter className="h-4 w-4" />,
    "Instagram": <Instagram className="h-4 w-4" />,
    "Youtube": <Youtube className="h-4 w-4" />
  };

  return (
    <footer className="bg-gray-50 border-t">
      {/* Newsletter section */}
      <div className="bg-gray-100 py-14 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">{footerData.newsletter.title}</h2>
            <p className="text-muted-foreground mb-6">{footerData.newsletter.subtitle}</p>
            
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={footerData.newsletter.inputPlaceholder}
                className="flex-1"
              />
              <Button type="submit" className="group bg-black hover:bg-gray-800 text-white">
                {footerData.newsletter.buttonText}
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
              <span className="text-xl font-bold">{footerData.companyInfo.name}</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {footerData.companyInfo.description}
            </p>
            
            <div className="space-y-4">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(footerData.companyInfo.contact.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-black transition-colors group"
              >
                <MapPin className="h-5 w-5 text-black flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">
                  {footerData.companyInfo.contact.address}
                </span>
              </a>
              <a 
                href={`tel:${footerData.companyInfo.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-3 hover:text-black transition-colors group"
              >
                <Phone className="h-5 w-5 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">
                  {footerData.companyInfo.contact.phone}
                </span>
              </a>
              <a 
                href={`mailto:${footerData.companyInfo.contact.email}`}
                className="flex items-center space-x-3 hover:text-black transition-colors group"
              >
                <Mail className="h-5 w-5 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-black">
                  {footerData.companyInfo.contact.email}
                </span>
              </a>
            </div>
            
            <div className="flex space-x-4 mt-6">
              {footerData.socialMedia.map((social, index) => (
                <Link 
                  key={index}
                  to={social.href} 
                  className="p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors"
                >
                  {socialIcons[social.name]}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{footerData.sectionTitles.categories}</h3>
            <ul className="space-y-3">
              {footerData.categories.map((category, index) => (
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
            <h3 className="font-semibold text-lg mb-4">{footerData.sectionTitles.quickLinks}</h3>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link, index) => (
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
            <h3 className="font-semibold text-lg mb-4">{footerData.sectionTitles.customerService}</h3>
            <ul className="space-y-3">
              {footerData.customerService.map((service, index) => (
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
              © {currentYear} {footerData.companyInfo.name}. {footerData.copyright.text}
            </div>
            
            <div className="flex items-center space-x-1">
              {footerData.paymentMethods.map((method, index) => (
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
              <span>{footerData.copyright.author}</span>
              <Heart className="inline h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;