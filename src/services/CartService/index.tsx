import { useState } from "react"
import { generatePath } from "react-router-dom"
import { deserialize, serialize } from "serializr"
import { NotificationTypes } from "../../enums/notificationTypes"
import axiosInstance from "../../interceptor/axiosInstance"
import { Coupon } from "../../models/Coupon/coupon.model"
import apiRoutes from "../../routes/routeConstants/apiRoutes"
import Notification from "../../shared/components/Notification"

const CartService = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const [coupons, setCoupons] = useState<Array<Coupon>>([])

    const [status, setStatus] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const fetchCoupons = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(apiRoutes.COUPON)
            const coupons = deserialize(Coupon, response.data["coupons"]) as unknown as Coupon[]
            setCoupons(coupons)
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

    const fetchCouponValidity = async (id: string, amount: number) => {
        setLoading(true)
        try {
            const API_URL = generatePath(apiRoutes.COUPON_VALIDITY, { id })
            const response = await axiosInstance.post(API_URL, { amount })
            setStatus(response.data.success);
            setMessage(response.data.message);
            return response.data
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return {
        status,
        loading,
        coupons,
        message,
        fetchCoupons,
        createCoupon,
        fetchCouponValidity,
    }

}

export default CartService