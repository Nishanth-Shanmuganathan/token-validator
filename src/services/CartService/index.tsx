import { useState } from "react"

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

    return {
        loading,
        fetchTokens,
    }

}

export default CartService