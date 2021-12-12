import React from 'react'
import Modal from './Modal'

const AnimalsModal=({isVisible, onClose})=> {
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            Animal Modal
        </Modal>
    )
}

export default AnimalsModal
