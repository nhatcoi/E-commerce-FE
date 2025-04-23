export const bannerData = {
  slides: [
    {
      id: 1,
      imageUrl: 'src/assets/img/banner/banner-template.png',
      title: 'Welcome to Our Website',
      description: 'Your journey to amazing experiences starts here.',
      button: {
        text: 'Get Started',
        variant: 'danger',
        url: '/get-started'
      }
    },
    {
      id: 2,
      imageUrl: 'src/assets/img/banner/banner-template.png',
      title: 'Discover Our Collection',
      description: 'Explore our wide range of quality products.',
      button: {
        text: 'Shop Now',
        variant: 'danger',
        url: '/shop'
      }
    },
    {
      id: 3,
      imageUrl: 'src/assets/img/banner/banner-template.png',
      title: 'Special Offers',
      description: 'Limited time deals on selected items.',
      button: {
        text: 'View Offers',
        variant: 'danger',
        url: '/offers'
      }
    }
  ],
  settings: {
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true
  }
};