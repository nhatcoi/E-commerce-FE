export const blogDetailData = {
  shareButtons: [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Copy Link", href: "#" }
  ],
  
  mockPost: {
    id: 1,
    title: "10 Essential Tips for Sustainable Fashion Shopping",
    content: `
      <p>Sustainable fashion is more than just a trend—it's a movement that's reshaping how we think about our clothing choices and their impact on the environment...</p>
      
      <h2>1. Quality Over Quantity</h2>
      <p>Invest in high-quality pieces that will last longer rather than fast fashion items that need frequent replacement...</p>
      
      <h2>2. Check the Materials</h2>
      <p>Look for sustainable materials like organic cotton, recycled polyester, and Tencel...</p>
      
      <blockquote>
        "The most sustainable garment is the one already in your wardrobe." - Fashion sustainability expert
      </blockquote>
      
      <h2>3. Research Brands</h2>
      <p>Support brands that prioritize sustainability and ethical manufacturing practices...</p>
    `,
    author: {
      name: "Sarah Johnson",
      avatar: "/assets/authors/sarah.jpg",
      role: "Fashion Editor"
    },
    publishDate: "2024-04-15T10:00:00Z",
    readTime: "5 min read",
    category: "Fashion",
    tags: ["Sustainable Fashion", "Shopping Guide", "Eco-Friendly", "Fashion Tips"],
    thumbnail: "/assets/blog/sustainable-fashion.jpg",
    relatedPosts: [
      {
        id: 2,
        title: "The Rise of Eco-Friendly Fashion Brands",
        thumbnail: "/assets/blog/eco-brands.jpg",
        excerpt: "Discover how sustainable fashion brands are changing the industry...",
        publishDate: "2024-04-10T09:00:00Z"
      },
      {
        id: 3,
        title: "How to Build a Sustainable Wardrobe",
        thumbnail: "/assets/blog/sustainable-wardrobe.jpg",
        excerpt: "Learn the key principles of creating an eco-friendly wardrobe...",
        publishDate: "2024-04-05T14:30:00Z"
      }
    ]
  },

  comments: {
    title: "Comments",
    subtitle: "Join the conversation and share your thoughts",
    placeholder: "Write your comment...",
    buttonText: "Post Comment"
  },

  newsletter: {
    title: "Subscribe to Our Newsletter",
    subtitle: "Get the latest articles and insights directly in your inbox.",
    buttonText: "Subscribe",
    placeholder: "Enter your email"
  }
};