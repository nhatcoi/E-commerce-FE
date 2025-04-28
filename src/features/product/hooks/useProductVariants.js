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
                price: 0,
                stockQuantity: 0
            }
        ]);
    };

    const removeAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const updateAttribute = (index, field, value) => {
        const newAttributes = [...attributes];
        if (field === 'price' || field === 'stockQuantity') {
            value = value === '' ? 0 : Number(value);
        }
        newAttributes[index] = {
            ...newAttributes[index],
            [field]: value
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