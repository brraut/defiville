import React from 'react'
import Modal from './Modal'

const PirateModal=({isVisible, onClose})=> {
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            Pirate Modal
        </Modal>
    )
}

export default PirateModal
