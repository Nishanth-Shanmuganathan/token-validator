import { Col, Collapse, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationTypes } from '../../enums/notificationTypes'
import { appRoutes } from '../../routes/routeConstants/appRoutes'
import CartService from '../../services/CartService'
import ButtonComponent from '../../shared/components/ButtonComponent'
import Chip from '../../shared/components/Chip'
import ModalComponent from '../../shared/components/ModalComponent'
import Notification from '../../shared/components/Notification'
import "./cart.scss"

const { Panel } = Collapse

const values = [5, 10, 25, 50, 100, 250, 500, 1000]

const MAX_LIMIT = 7500

const Cart = () => {

    const {
        status,
        loading,
        coupons,
        message,
        fetchCoupons,
        fetchCouponValidity,
    } = CartService()

    const [cartValue, setCartValue] = useState<number>(0)

    const [couponModalVisible, setCouponModalVisible] = useState<boolean>(false)

    useEffect(() => {
        fetchCoupons()
    }, [])

    const updateCartValue = (val: number) => {
        const newValue = cartValue + val
        if (newValue > MAX_LIMIT) {
            Notification({
                message: "Cart reached maximum limit",
                type: NotificationTypes.ERROR
            })
            return
        }
        setCartValue(newValue)
    }

    const resetCart = () => setCartValue(0)

    const couponValiditation = async (id: string) => {
        const response = await fetchCouponValidity(id, cartValue)
        response && setCouponModalVisible(true)
    }

    const closeCouponModal = () => {
        setCouponModalVisible(false)
    }

    return (
        <Row className='cart__wrapper' gutter={[16, 16]}>
            <Col span={24}>
                <Link to={appRoutes.COUPON}>
                    <i className='icon-plus'></i>
                    <span>Create token</span>
                </Link>
            </Col>
            <Col span={12}>
                <Collapse
                    accordion
                    expandIcon={() => <i className='icon-ticket' />}
                    className="cart__coupons-list__wrapper">
                    {coupons?.map(coupon => <Panel

                        key={coupon.id}
                        className="cart__coupons-list--coupon"
                        header={
                            <p className='cart__coupons-list--coupon-code'>
                                {coupon.code}
                            </p>}>
                        <div className='cart__coupons-list--coupon__content'>
                            <h3>{coupon.title}</h3>
                            <em className='hint'>{coupon.description}</em>
                            {coupon.minimumOrderValue && <span className='cart__coupons-list--coupon__content-min-order'>Offer applicable on minimum order of <i className='icon-inr' /> {coupon.minimumOrderValue} and above.</span>}
                            {coupon.flat && <span>Flat <i className='icon-inr' />{coupon.flat} on applicable orders.</span>}
                            {coupon.discount && <span>{coupon.discount}% off on applicable orders</span>}
                            {coupon.maximumDiscountValue && <span> upto <i className='icon-inr' /> {coupon.maximumDiscountValue}.</span>}
                            <div className='cart__coupons-list--coupon__content--actions'>
                                <ButtonComponent
                                    type="primary"
                                    loading={loading}
                                    children={'Apply'}
                                    onClick={() => couponValiditation(coupon.id)}
                                />
                            </div>
                        </div>
                    </Panel>)}
                </Collapse>
            </Col>
            <Col span={12}>
                <div className="cart__value-generator__wrapper">
                    <h1 className='cart__value-generator--value'>
                        <span>Cart Value:</span>
                        <span><i className='icon-inr' />{(cartValue).toFixed(2)}</span>
                    </h1>
                    <em className='cart__value-generator--hint'>Select the following values of your choice to generate random cart value. Maximum cart value is set as 7500</em>
                    <div className='cart__value-generator--chips'>
                        {values.map(value => <Chip
                            key={value}
                            value={value}
                            onClick={updateCartValue} />)}
                        <Chip
                            key={0}
                            value={0}
                            label="Reset"
                            onClick={resetCart} />
                    </div>
                </div>
            </Col>
            <ModalComponent
                visible={couponModalVisible}
                closeHandler={closeCouponModal}
            >
                <div className={`coupon-result__content ${status ? 'success' : 'danger'}`}>
                    {message}
                </div>
            </ModalComponent>
        </Row>
    )
}

export default Cart