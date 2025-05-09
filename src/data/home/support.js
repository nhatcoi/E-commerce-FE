import support1 from 'src/assets/img/support/support-1.png';
import support2 from 'src/assets/img/support/support-2.png';
import support3 from 'src/assets/img/support/support-3.png';

export const supportData = {
  items: [
    {
      imgSrc: support1,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $99',
    },
    {
      imgSrc: support2,
      title: 'Support 24/7',
      description: 'Support 24/7 available for all customers',
    },
    {
      imgSrc: support3,
      title: 'Money Return',
      description: 'Return money within 30 days',
    }
  ],
  layout: {
    containerClass: "support-area",
    itemClass: "support-item d-flex flex-column align-items-center",
    iconClass: "support-icon",
    imgClass: "support-icon-img",
    titleClass: "support-title mt-3",
    descriptionClass: "support-description"
  }
};