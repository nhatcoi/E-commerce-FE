import banner1 from 'src/assets/img/banner/banner1.png';
import banner2 from 'src/assets/img/banner/banner2.png';
import banner3 from 'src/assets/img/banner/banner3.png';

export const bannerData = {
  slides: [
    {
      id: 1,
      imageUrl: banner1,
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
      imageUrl: banner2,
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
      imageUrl: banner3,
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