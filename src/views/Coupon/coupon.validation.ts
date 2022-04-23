import { DiscountTypes } from '../../enums/discountTypes.enum';
import * as yup from "yup";

const couponValidationSchema = yup.object({
    code: yup
        .string()
        .min(5, "Coupon code should atleast have 5 digits")
        .max(15, "Coupon code should not have more than 15 digits")
        .required("Coupon code is required!"),
    title: yup
        .string()
        .min(5, "Title should atleast have 5 letters")
        .max(50, "Title should not have more than 50 letters")
        .required("Title is required!"),
    description: yup
        .string()
        .min(5, "Description should atleast have 5 letters")
        .max(150, "Description should not have more than 150 letters")
        .required("Description is required!"),
    minimumOrderValue: yup
        .number()
        .min(10, "Minimum order amount should atleast be 10")
        .max(10000, "Minimum order amount should not be more than 10000")
        .required("Minimum order amount is required!"),
    validTill: yup
        .string()
        .typeError("Validity is invalid")
        .required("Validity is required!"),
    discount: yup
        .number()
        .typeError("Discount % is invalid")
        .when("discountMode", {
            is: (value: DiscountTypes) => value === DiscountTypes.PERCENTAGE,
            then: yup
                .number()
                .min(1, "Discount should atleast be 1%")
                .max(100, "Discount should not be more than 100%")
                .typeError("Discount % is invalid")
                .required("Discount % is required!")
        }),
    maximumDiscountValue: yup
        .number()
        .typeError("Maximum discount is invalid")
        .when("discountMode", {
            is: (value: DiscountTypes) => value === DiscountTypes.PERCENTAGE,
            then: yup
                .number()
                .min(10, "Maximum discount should atleast be 10")
                .max(1000, "Maximum discount should not be more than 1000")
                .typeError("Maximum discount is invalid")
                .required("Maximum discount is required!")
        }),
    flat: yup
        .number()
        .typeError("Discount is invalid")
        .when("discountMode", {
            is: (value: DiscountTypes) => value === DiscountTypes.FLAT_DISCOUNT,
            then: yup
                .number()
                .min(10, "Discount should atleast be 10")
                .max(1000, "Discount should not be more than 1000")
                .typeError("Discount is invalid")
                .required("Discount is required!")
        }),
})

export default couponValidationSchema