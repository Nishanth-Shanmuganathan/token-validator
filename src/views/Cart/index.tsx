import React from 'react'
import { NavLink } from 'react-router-dom'
import { appRoutes } from '../../routes/routeConstants/appRoutes'
import "./cart.scss"

const Cart = () => {
    return (
        <div className='cart__wrapper'>
            <NavLink to={appRoutes.COUPON}>Cart</NavLink>
        </div>
    )
}

export default Cart