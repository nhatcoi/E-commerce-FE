export const MOCK_DASHBOARD_DATA = {
  stats: {
    totalSales: {
      value: 34945,
      trend: 1.56,
      positive: true
    },
    totalIncome: {
      value: 37802,
      trend: 1.56,
      positive: false
    },
    ordersPaid: {
      value: 34945,
      trend: 0,
      positive: true
    },
    totalVisitor: {
      value: 34945,
      trend: 1.56,
      positive: true
    }
  },
  recentOrderChart: {
    // This would normally contain chart data points
    // For a real implementation, we'd use a library like recharts or chart.js
    data: [
      { month: 'Jan', sales: 1000 },
      { month: 'Feb', sales: 1500 },
      { month: 'Mar', sales: 1200 },
      { month: 'Apr', sales: 1800 },
      { month: 'May', sales: 1400 },
      { month: 'Jun', sales: 2000 },
      { month: 'Jul', sales: 1700 },
      { month: 'Aug', sales: 1900 },
      { month: 'Sep', sales: 2100 },
      { month: 'Oct', sales: 1800 },
      { month: 'Nov', sales: 2200 },
      { month: 'Dec', sales: 2000 }
    ]
  },
  topProducts: [
    {
      id: 1,
      name: 'Patimax Fragrance Long...',
      items: '101 items',
      couponCode: '5flat',
      flag: '🇪🇸',
      discount: -15,
      price: '$7.00'
    },
    {
      id: 2,
      name: 'Nulo MedalSeries Adult Cat...',
      items: '101 items',
      couponCode: '5flat',
      flag: '🇮🇳',
      discount: -15,
      price: '$7.00'
    },
    {
      id: 3,
      name: 'Pedigree Puppy Dry Dog...',
      items: '101 items',
      couponCode: '5flat',
      flag: '🇬🇧',
      discount: -15,
      price: '$7.00'
    },
    {
      id: 4,
      name: 'Biscotto Premier Cookie...',
      items: '101 items',
      couponCode: '5flat',
      flag: '🇧🇷',
      discount: -15,
      price: '$7.00'
    },
    {
      id: 5,
      name: 'Pedigree Adult Dry Dog...',
      items: '101 items',
      couponCode: '5flat',
      flag: '🇫🇷',
      discount: -15,
      price: '$7.00'
    }
  ],
  topCountries: [
    {
      country: 'Turkish Flag',
      revenue: 6972,
      trend: 'up'
    },
    {
      country: 'Belgium',
      revenue: 6972,
      trend: 'up'
    },
    {
      country: 'Sweden',
      revenue: 6972,
      trend: 'down'
    },
    {
      country: 'Vietnamese',
      revenue: 6972,
      trend: 'up'
    },
    {
      country: 'Australia',
      revenue: 6972,
      trend: 'down'
    },
    {
      country: 'Saudi Arabia',
      revenue: 6972,
      trend: 'down'
    }
  ],
  bestShopSellers: [
    {
      name: 'Robert',
      purchases: '12 Purchases',
      avatar: '👨',
      categories: 'Kitchen, Pets',
      total: '$1,000',
      status: 100
    },
    {
      name: 'Calvin',
      purchases: '66 Purchases',
      avatar: '👨',
      categories: 'Health, Grocery',
      total: '$4,000',
      status: 100
    },
    {
      name: 'Dwight',
      purchases: '10,980 Purchases',
      avatar: '👨',
      categories: 'Electronics',
      total: '$2,700',
      status: 100
    },
    {
      name: 'Cody',
      purchases: '12 Purchases',
      avatar: '👨',
      categories: 'Movies, Music',
      total: '$2,100',
      status: 100
    },
    {
      name: 'Bruce',
      purchases: '127 Purchases',
      avatar: '👨',
      categories: 'Sports, Fitness',
      total: '$4,400',
      status: 100
    }
  ],
  productOverview: [
    {
      id: '#327',
      name: 'Soft Fluffy Cats',
      price: '$11.70',
      quantity: 28,
      sale: 'On sale',
      revenue: '$328.85',
      status: 'Not Available'
    },
    {
      id: '#380',
      name: 'Taste of the Wild Formula Finder',
      price: '$8.99',
      quantity: 10,
      sale: 'On sale',
      revenue: '$105.55',
      status: 'Not Available'
    },
    {
      id: '#126',
      name: 'Wellness Natural Food',
      price: '$5.22',
      quantity: 578,
      sale: '--/--',
      revenue: '$202.87',
      status: 'Not Available'
    },
    {
      id: '#582',
      name: 'Dog Food Rachael Ray',
      price: '$14.91',
      quantity: 36,
      sale: '--/--',
      revenue: '$475.22',
      status: 'Available'
    },
    {
      id: '#283',
      name: 'Best Buddy Bits Dog Treats',
      price: '$6.48',
      quantity: 84,
      sale: '--/--',
      revenue: '$219.78',
      status: 'Not Available'
    }
  ],
  totalIncome: {
    value: '$37,802',
    trend: '1.56%',
    period: 'since last weekend'
  }
};