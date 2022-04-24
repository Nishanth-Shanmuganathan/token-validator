import { DiscountTypes } from './../../enums/discountTypes.enum';
import { alias, primitive, serializable } from "serializr";

export class Coupon {

    @serializable(alias("_id", primitive()))
    id?: string

    @serializable(alias("code", primitive()))
    code?: string

    @serializable(alias("title", primitive()))
    title?: string

    @serializable(alias("description", primitive()))
    description?: string

    @serializable(alias("discount_mode", primitive()))
    discountMode?: DiscountTypes = DiscountTypes.FLAT_DISCOUNT

    @serializable(alias("image_url", primitive()))
    imageUrl?: string

    @serializable(alias("valid_till", primitive()))
    validTill?: string

    @serializable(alias("minimum_order_value", primitive()))
    minimumOrderValue?: number

    @serializable(alias("discount", primitive()))
    discount?: number

    @serializable(alias("flat", primitive()))
    flat?: number

    @serializable(alias("maximum_discount_value", primitive()))
    maximumDiscountValue?: number

}