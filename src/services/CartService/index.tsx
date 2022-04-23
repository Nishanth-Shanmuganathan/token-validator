import { useState } from "react"
import { serialize } from "serializr"
import { NotificationTypes } from "../../enums/notificationTypes"
import axiosInstance from "../../interceptor/axiosInstance"
import { Coupon } from "../../models/Coupon/coupon.model"
import apiRoutes from "../../routes/routeConstants/apiRoutes"
import Notification from "../../shared/components/Notification"

const CartService = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const fetchTokens = async () => {
        setLoading(true)
        try {

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const createCoupon = async (coupon: Coupon) => {
        setLoading(true)
        try {
            const payload = { coupon: serialize(Coupon, coupon) }
            const response = await axiosInstance.post(apiRoutes.COUPON, payload)
            Notification({
                message: response.data?.message,
                type: NotificationTypes.SUCCESS
            })
            return response.data['coupon']
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        fetchTokens,
        createCoupon,
    }

}

export default CartService