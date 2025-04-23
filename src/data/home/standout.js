export const standoutData = {
  title: "Daily Deals!",
  filterOptions: [
    { label: "New Arrivals", value: "new", params: { sortByNew: true } },
    { label: "Best Sellers", value: "best", params: { sortByBest: true } },
    { label: "Sale Items", value: "sale", params: { onSale: true } },
  ],
  sectionStyle: {
    padding: "py-12 mb-20"
  },
  display: {
    itemsPerPage: 8,
    gridCols: {
      xs: 12,
      sm: 6,
      md: 3
    }
  }
};