export function Loader({ className = "" }) {
    return (
        <div className={`animate-spin h-6 w-6 border-4 border-gray-300 border-t-gray-900 rounded-full ${className}`} />
    );
}
