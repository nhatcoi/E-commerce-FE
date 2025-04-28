
/**
 * Format dd/MM/yyyy HH:mm:ss
 */
export function formatDateTime(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

/**
 * Format dd/MM/yyyy
 */
export function formatDateOnly(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-GB');
}

/**
 * Format HH:mm:ss
 */
export function formatTimeOnly(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

/**
 * Format ISO  (2025-01-27T14:30:45)
 */
export function formatIsoString(date) {
    if (!date) return "";
    return new Date(date).toISOString();
}