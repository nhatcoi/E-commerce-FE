export const footerData = {
  companyInfo: {
    name: "JackieShop",
    description: "JackieShop is your one-stop destination for all things fashion, electronics, and lifestyle. We bring you the best products from around the world at competitive prices.",
    contact: {
      address: "123 Shopping Street, Commerce City, Country",
      phone: "+84 (0)37 6696 037",
      email: "contact@jackieshop.com"
    }
  },

  categories: [
    { name: "Electronics", href: "/shop?category=electronics" },
    { name: "Clothing", href: "/shop?category=clothing" },
    { name: "Home & Garden", href: "/shop?category=home" },
    { name: "Beauty", href: "/shop?category=beauty" },
    { name: "Sports", href: "/shop?category=sports" }
  ],

  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" }
  ],
  
  customerService: [
    { name: "My Account", href: "/account" },
    { name: "Track Order", href: "/orders/track" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Policy", href: "/shipping" }
  ],
  
  paymentMethods: [
    { name: "Visa", image: "/assets/payment/visa.png" },
    { name: "Mastercard", image: "/assets/payment/mastercard.png" },
    { name: "PayPal", image: "/assets/payment/paypal.png" },
    { name: "Apple Pay", image: "/assets/payment/applepay.png" }
  ],

  features: [
    { 
      title: "Free Shipping",
      description: "On all orders over $50"
    },
    { 
      title: "Secure Payment",
      description: "100% secure payment"
    },
    { 
      title: "Quality Products",
      description: "Premium quality items"
    }
  ],

  newsletter: {
    title: "Join Our Newsletter",
    subtitle: "Stay updated with our latest offers and promotions",
    buttonText: "Subscribe",
    inputPlaceholder: "Your email address"
  },

  socialMedia: [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Youtube", href: "#" }
  ],

  sectionTitles: {
    categories: "Categories",
    quickLinks: "Quick Links",
    customerService: "Customer Service"
  },

  copyright: {
    text: "All rights reserved.",
    author: "Made with love by Jackie"
  }
};