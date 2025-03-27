import apiRequest from "../config/apiRequest.js";



const ratingService = {

  getAverageRatings: (productIds) =>
      apiRequest("get", `/products/ratings/average`, null, { ids: productIds.join(',') }),

  getProductRatings: (productId) =>
      apiRequest("get", `/products/${productId}/ratings`),

  submitRating: (productId, ratingData) =>
      apiRequest("post", `/products/${productId}/ratings`, ratingData),

  updateRating: (productId, ratingId, ratingData) =>
      apiRequest("put", `/products/${productId}/ratings/${ratingId}`, ratingData),

  deleteRating: (productId, ratingId) =>
      apiRequest("delete", `/products/${productId}/ratings/${ratingId}`),

  getAverageRating: (productId) =>
      apiRequest("get", `/products/${productId}/average-rating`),
};

export default ratingService;
