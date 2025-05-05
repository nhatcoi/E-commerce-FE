export const buildCategoryTree = (categories) => {
    const categoryMap = new Map();
    const rootCategories = [];

    // First pass: Create a map of all categories
    categories.forEach(category => {
        categoryMap.set(category.id, {
            ...category,
            children: []
        });
    });

    // Second pass: Build the tree structure
    categories.forEach(category => {
        const categoryWithChildren = categoryMap.get(category.id);
        
        if (category.parentId === null) {
            rootCategories.push(categoryWithChildren);
        } else {
            const parent = categoryMap.get(category.parentId);
            if (parent) {
                parent.children.push(categoryWithChildren);
            }
        }
    });

    return rootCategories;
};

export const flattenCategoryTree = (categories, level = 0) => {
    let flattened = [];
    
    categories.forEach(category => {
        flattened.push({
            ...category,
            level,
            displayName: '  '.repeat(level) + category.name
        });
        
        if (category.children && category.children.length > 0) {
            flattened = flattened.concat(flattenCategoryTree(category.children, level + 1));
        }
    });
    
    return flattened;
};