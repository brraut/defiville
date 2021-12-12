import React from 'react'
import Modal from './Modal'

const FactoryModal=({isVisible, onClose})=> {
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            Factory Modal
        </Modal>
    )
}

export default FactoryModal
