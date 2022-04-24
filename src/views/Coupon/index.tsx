import React, { Fragment } from 'react'
import "./coupon.scss"
import { Form, Formik, FormikHelpers } from 'formik'
import { Coupon as CouponModel } from '../../models/Coupon/coupon.model'
import InputField from '../../shared/components/InputField'
import { Col, Row } from 'antd'
import ButtonComponent from '../../shared/components/ButtonComponent'
import RadioField from '../../shared/components/RadioField'
import { DiscountTypes } from '../../enums/discountTypes.enum'
import DatepickerComponent from '../../shared/components/DatepickerComponent'
import moment from 'moment'
import couponValidationSchema from './coupon.validation'
import CartService from '../../services/CartService'
import { Link } from 'react-router-dom'
import { appRoutes } from '../../routes/routeConstants/appRoutes'

const discountModes = [
    { label: "Flat discount", value: DiscountTypes.FLAT_DISCOUNT },
    { label: "Percentage discount", value: DiscountTypes.PERCENTAGE },
]

const Coupon = () => {

    const {
        loading,
        createCoupon,
    } = CartService()

    const handleSubmit = async (coupon: CouponModel, helpers: FormikHelpers<CouponModel>) => {
        const response = await createCoupon(coupon);
        response && helpers.resetForm()
    }

    return (
        <div className="coupon__wrapper">
            <Link to={appRoutes.CART}>
                <i className='icon-arrow-left2'></i>
                <span>Back to cart</span>
            </Link>
            <h1 className='coupon--page-header'>Create new coupon</h1>
            <Formik
                validationSchema={couponValidationSchema}
                initialValues={new CouponModel()}
                onSubmit={handleSubmit}>
                {({ values, setFieldValue, resetForm }) => <Form>
                    <Row className='coupon__form' gutter={[0, 16]}>
                        <Col span={24}>
                            <InputField
                                type={'text'}
                                name={'code'}
                                title={'Coupon code'}
                                placeholder={'Enter coupon code'}
                                onChange={e => setFieldValue("code", e.target?.value?.toUpperCase())}
                            />
                        </Col>
                        <Col span={24}>
                            <InputField
                                type={'text'}
                                name={'title'}
                                title={'Title'}
                                placeholder={'Enter title'}
                            />
                        </Col>
                        <Col span={24}>
                            <InputField
                                type={'textarea'}
                                name={'description'}
                                title={'Description'}
                                placeholder={'Enter description ( max 150 characters )'}
                            />
                        </Col>
                        <Col span={24}>
                            <InputField
                                type={'number'}
                                name={'minimumOrderValue'}
                                title={'Minimum Order Amount'}
                                placeholder={'Enter minimum order amount'}
                            />
                        </Col>
                        <Col span={24} className="coupon__form--radio">
                            <RadioField
                                value={values.discountMode}
                                name="discountMode"
                                options={discountModes}
                                onChange={value => {
                                    setFieldValue("discountMode", value)
                                    setFieldValue("flat", undefined)
                                    setFieldValue("discount", undefined)
                                    setFieldValue("maximumDiscountValue", undefined)
                                }}
                            />
                        </Col>
                        {values.discountMode === DiscountTypes.FLAT_DISCOUNT
                            ? <Col span={24}>
                                <InputField
                                    type={'number'}
                                    name={'flat'}
                                    title={'Discount'}
                                    placeholder={'Enter discount amount'}
                                />
                            </Col>
                            : <Fragment>
                                <Col span={24}>
                                    <InputField
                                        type={'number'}
                                        name={'discount'}
                                        title={'Discount %'}
                                        placeholder={'Enter discount percentage'}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputField
                                        type={'number'}
                                        name={'maximumDiscountValue'}
                                        title={'Maximum Discount Amount'}
                                        placeholder={'Enter maximum discount amount'}
                                    />
                                </Col>
                            </Fragment>
                        }
                        <Col span={24}>
                            <DatepickerComponent
                                name={'validTill'}
                                title={'Validity'}
                                placeholder={'Select the expiration date'}
                                value={values.validTill}
                                disabledDate={(date) => moment(date) < moment(new Date())}
                            />
                        </Col>
                        <Col span={24} className="coupon__form--actions">
                            <ButtonComponent
                                type='primary'
                                loading={loading}
                                children={"Create"}
                                htmlType="submit"
                            />
                            <ButtonComponent
                                type='text'
                                children={"Cancel"}
                                onClick={resetForm}
                                htmlType="button"
                            />
                        </Col>
                    </Row>
                </Form>}
            </Formik>
        </div>
    )
}

export default Coupon