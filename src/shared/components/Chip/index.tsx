import { Button } from 'antd'
import React, { FC } from 'react'
import "./chip.scss"

interface ChipProps {
    label?: string
    value: number
    onClick?: (val: number) => void
}

const Chip: FC<ChipProps> = (props) => {

    const {
        value,
        label = value,
        onClick = () => { },
    } = props

    return (
        <Button
            className='chip'
            onClick={() => onClick(value)}
        >{label}</Button>
    )
}

export default Chip