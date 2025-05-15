import { useState } from 'react';

export const useProductVariants = (initialAttributes = [], initialSpecifications = []) => {
    const [attributes, setAttributes] = useState(initialAttributes);
    const [specifications, setSpecifications] = useState(initialSpecifications);

    const addAttribute = () => {
        setAttributes([
            ...attributes,
            {
                attributeName: "",
                attributeValue: "",
                price: "",
                stockQuantity: ""
            }
        ]);
    };

    const removeAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const updateAttribute = (index, field, value) => {
        const newAttributes = [...attributes];
        let finalValue = value;
        
        // Convert to number for numeric fields
        if (field === 'price' || field === 'stockQuantity') {
            finalValue = value === '' ? '' : Number(value);
        }
        
        newAttributes[index] = {
            ...newAttributes[index],
            [field]: finalValue
        };
        setAttributes(newAttributes);
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { name: "", value: "" }]);
    };

    const removeSpecification = (index) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const updateSpecification = (index, field, value) => {
        const newSpecs = [...specifications];
        newSpecs[index] = {
            ...newSpecs[index],
            [field]: value
        };
        setSpecifications(newSpecs);
    };

    return {
        attributes,
        specifications,
        addAttribute,
        removeAttribute,
        updateAttribute,
        addSpecification,
        removeSpecification,
        updateSpecification,
        setAttributes,
        setSpecifications
    };
};