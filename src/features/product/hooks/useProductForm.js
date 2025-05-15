import { useForm } from "react-hook-form";
import { useImageUpload } from "./useImageUpload.js";
import { useProductVariants } from "./useProductVariants.js";
import { toast } from "src/components/ui/use-toast.js";
import { useCreateProductMutation } from "../services/productApi.js";
import { useEffect } from "react";

/**
 * Hook quản lý form sản phẩm
 * @param {Object} params - Tham số đầu vào
 * @param {Function} params.onSuccess - Callback khi lưu thành công
 */
export const useProductForm = ({ onSuccess }) => {
    // Các hook API
    const { isUploading } = useImageUpload(); // Hook quản lý upload ảnh
    const [createProduct, { isLoading }] = useCreateProductMutation();

    // Thiết lập form với giá trị mặc định
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            originalPrice: "",
            quantity_in_stock: "",
            categoryId: "",
            thumbnail: null,
            productImages: [],
            specifications: [{ name: "", value: "" }],
            attributes: []
        }
    });

    // Quản lý biến thể và thông số kỹ thuật sản phẩm
    const {
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
    } = useProductVariants([], [{ name: "", value: "" }]);

    /**
     * Xử lý tải lên ảnh
     * @param {Event} e - Sự kiện change của input file
     * @param {string} fieldName - Tên trường (thumbnail hoặc productImages)
     */
    const handleImageUpload = async (e, fieldName) => {
        try {
            if (!e.target.files?.length) return;

            const files = Array.from(e.target.files);

            if (fieldName === "thumbnail") {
                // thumbnail only accept one file
                form.setValue("thumbnail", files[0]);
            } else {
                const currentImages = form.getValues("productImages") || [];
                form.setValue("productImages", [...currentImages, ...files]);
            }
            // reset input
            e.target.value = '';
            toast({
                title: "Success",
                description: `Image${files.length > 1 ? 's' : ''} added successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add image, please try again",
                variant: "destructive",
            });
            e.target.value = '';
        }
    };

    /**
     * Chuẩn bị dữ liệu form để gửi lên server
     * @param {Object} data - Dữ liệu form
     * @returns {FormData} - FormData để gửi lên API
     */
    const prepareFormData = (data) => {
        // Lọc bỏ các thông số kỹ thuật trống
        const validSpecifications = specifications.filter(spec => spec.name && spec.value);
        
        // Lọc bỏ các thuộc tính trống và chuyển đổi định dạng
        const validAttributes = attributes
            .filter(attr => 
                attr.attributeName && 
                attr.attributeValue && 
                attr.price !== "" && 
                attr.stockQuantity !== ""
            )
            .map(attr => ({
                name: attr.attributeName,
                value: attr.attributeValue,
                price: Number(attr.price),
                stockQuantity: Number(attr.stockQuantity)
            }));

        // Tạo đối tượng dữ liệu sản phẩm
        const productData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
            stock: Number(data.quantity_in_stock),
            categoryId: Number(data.categoryId),
            specifications: validSpecifications,
            attributes: validAttributes
        };

        // FormData gửi API
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail);
        }

        if (data.productImages?.length > 0) {
            data.productImages.forEach(file => formData.append('productImages', file));
        }

        return formData;
    };

    /**
     * Xử lý khi submit form
     * @param {Object} data - Dữ liệu form
     */
    const onSubmit = async (data) => {
        try {
            const formData = prepareFormData(data);
            
            await createProduct(formData).unwrap();
            toast({
                title: "Success",
                description: "Product created successfully",
            });
            form.reset();

            onSuccess?.();
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: error.data?.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return {
        form,
        isUploading,
        isLoading,
        attributes,
        specifications,
        addAttribute,
        removeAttribute,
        updateAttribute,
        addSpecification,
        removeSpecification,
        updateSpecification,
        handleImageUpload,
        onSubmit
    };
}; 