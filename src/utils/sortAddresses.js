/**
 * Sorts an array of addresses with main address first
 * @param {Array} addresses - Array of address objects
 * @param {Object} options - Sorting options
 * @param {string} options.sortBy - Field to sort by after main address ('city', 'country', etc.)
 * @param {boolean} options.ascending - Sort direction (true for ascending, false for descending)
 * @returns {Array} Sorted array of addresses
 */
export const sortAddresses = (addresses = [], options = { sortBy: null, ascending: true }) => {
    if (!Array.isArray(addresses)) {
        return [];
    }

    return [...addresses].sort((a, b) => {
        // Always put main address first
        if (a.isMain !== b.isMain) {
            return a.isMain ? -1 : 1;
        }

        // If both addresses have same main status and sortBy option is provided
        if (options.sortBy && a[options.sortBy] && b[options.sortBy]) {
            const compareResult = a[options.sortBy].localeCompare(b[options.sortBy]);
            return options.ascending ? compareResult : -compareResult;
        }

        // Default to id sorting if no other criteria match
        return a.id - b.id;
    });
};

/**
 * Formats an address object into a readable string
 * @param {Object} address - Address object
 * @param {string} format - Format string (e.g., "line1, district, city, country")
 * @returns {string} Formatted address string
 */
export const formatAddress = (address, format = "full") => {
    if (!address) return "";

    const formats = {
        full: `${address.addressLine}, ${address.district}, ${address.city}, ${address.country}`,
        cityDistrict: `${address.district}, ${address.city}`,
        postalLocation: `${address.postcode}, ${address.country}`,
        line: address.addressLine
    };

    return formats[format] || formats.full;
};