import { DatePicker } from 'antd'
import { ErrorMessage, Field } from 'formik'
import moment from 'moment'
import React, { FC, Fragment } from 'react'
import "./datepickerComponent.scss"
import Error from "../Error"

interface DatepickerComponentProps {
    title: string
    name: string
    value?: string
    placeholder: string
    onChange?: (date: any, dateString: string) => void
    disabledDate?: (date: number) => boolean;
}

const DatepickerComponent: FC<DatepickerComponentProps> = (props) => {

    const {
        title,
        name,
        value = '',
        onChange,
        placeholder,
        disabledDate = () => { }
    } = props

    return (
        <Fragment>
            <Field name={name}>
                {({ field, form: { setFieldValue } }: any) => <div className={`input-field__wrapper datepicker-component__wrapper`}>
                    {title && <label htmlFor={name}>{title}</label>}
                    <DatePicker
                        {...field}
                        disabledDate={disabledDate}
                        placeholder={placeholder}
                        value={value ? moment(value) : null}
                        onChange={(date, dateString) => onChange ? onChange(date, dateString) : setFieldValue(name, dateString)}
                    />
                </div>
                }
            </Field>
            <ErrorMessage name={name}>
                {(message: string) => <Error message={message} />}
            </ErrorMessage>
        </Fragment>
    )
}

export default DatepickerComponent