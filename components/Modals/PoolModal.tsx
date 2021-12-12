import React from 'react'
import Modal from './Modal'

const PoolModal=({isVisible, onClose})=> {
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            Pool Modal
        </Modal>
    )
}

export default PoolModal
