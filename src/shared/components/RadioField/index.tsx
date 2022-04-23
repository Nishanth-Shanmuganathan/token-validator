import { CheckboxOptionType, Radio } from 'antd'
import { Field } from 'formik'
import React, { FC } from 'react'
import "./radioField.scss"

interface RadioFieldProps {
    name: string
    value?: string
    options: CheckboxOptionType[]
    onChange?: (value: string) => void
}

const RadioField: FC<RadioFieldProps> = (props) => {

    const {
        value,
        name,
        options,
        onChange,
    } = props

    return (
        <Field>
            {({ field, form: { setFieldValue } }: any) => <Radio.Group
                className='radio-field'
                {...field}
                onChange={(event) => onChange ? onChange(event.target.value) : setFieldValue(name, event.target.value)}
                value={value}
                options={options}
            >
            </Radio.Group>}
        </Field>
    )
}

export default RadioField