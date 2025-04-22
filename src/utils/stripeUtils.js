/**
 * Utility functions for Stripe payment processing
 */

/**
 * Parse Stripe redirect status from URL parameters
 * @returns {Object} The parsed Stripe status and details
 */
export const getStripeRedirectStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('payment_status');
    const orderId = urlParams.get('order_id');
    const sessionId = urlParams.get('session_id');
    
    return {
        status,
        orderId,
        sessionId,
        hasRedirect: Boolean(status),
        isSuccess: status === 'success',
        isCanceled: status === 'cancel'
    };
};

/**
 * Clear Stripe redirect parameters from URL
 */
export const clearStripeParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('payment_status');
    url.searchParams.delete('order_id');
    url.searchParams.delete('session_id');
    
    window.history.replaceState({}, document.title, url.toString());
}; 