import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function generateSlug(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim();
}

export function getSlugFromUrl(url) {
    return url.split('/').pop();
}
