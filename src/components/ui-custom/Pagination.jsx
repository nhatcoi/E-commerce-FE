// import React from 'react';
// import PropTypes from "prop-types";
// import 'src/css/home.css';
//
// const PAGINATION_TO_SHOW = 5;
//
// const Pagination = ({ totalPages, currentPage, onPageChange, url }) => {
//     const startPage = Math.floor(currentPage / PAGINATION_TO_SHOW) * PAGINATION_TO_SHOW;
//     const endPage = Math.min(startPage + PAGINATION_TO_SHOW, totalPages);
//
//     const createPageLink = (page, text, active = '') => {
//         return (
//             <a
//                 href="#"
//                 className={`pagination-link ${active}`}
//                 data-page={page}
//                 onClick={(e) => {
//                     e.preventDefault();
//                     onPageChange(page);
//                 }}
//             >
//                 {text}
//             </a>
//         );
//     };
//
//     return (
//         <section className="pagination">
//             <div className="container">
//                 <div className="product__pagination blog__pagination">
//                     {/* Nút "trở về" */}
//                     {startPage > 0 && createPageLink(startPage - 1, '«')}
//
//                     {/* Các trang */}
//                     {Array.from({ length: endPage - startPage }, (_, index) => {
//                         const page = startPage + index;
//                         return createPageLink(page, page + 1, page === currentPage ? 'active' : '');
//                     })}
//
//                     {/* Nút "tiến tới" */}
//                     {endPage < totalPages && createPageLink(endPage, '»')}
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// Pagination.propTypes = {
//     totalPages: PropTypes.number.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     url: PropTypes.string
// };
//
// export default Pagination;
