import { Modal } from 'antd'
import React, { FC } from 'react'
import "./modalComponent.scss"

interface ModalComponentProps {
    visible: boolean
    closeHandler: () => void
}

const ModalComponent: FC<ModalComponentProps> = (props) => {

    const {
        visible,
        closeHandler,
        children,
    } = props


    return (
        <Modal
            closable
            footer={false}
            visible={visible}
            destroyOnClose
            maskClosable
            onCancel={closeHandler}
            closeIcon={<i className='icon-cross' />}
            className="modal-component__wrapper"
        >
            {children}
        </Modal>
    )
}

export default ModalComponent