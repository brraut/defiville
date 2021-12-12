import { StyleSheet, css } from "aphrodite";
import React, {  useEffect, useRef, useState } from 'react';
const Modal = ({children, isVisible, onClose, width = "500px" }) => {
	const styles = Styles(width);
	const modal = useRef<HTMLDivElement>(null);
	const insideModal = useRef<HTMLDivElement>(null);
	useEffect(
        () => {
			const handleEvent =(e)=>{
				if(!insideModal.current.contains(e.target)) onClose();
			}
            if (isVisible) {
				document.addEventListener('click', handleEvent);
                modal.current.classList.add(css(styles.show));
            }
            else {
                modal.current.classList.remove(css(styles.show));
            }
			return ()=> document.removeEventListener('click', handleEvent)
        },
		[isVisible]
    );
	return (
	<div>

		<div ref={modal} className={css(styles.modal)}>

			<div ref={insideModal} className={css(styles.modalContent)}>
				
				{children}
			</div>

		</div>
	</div>
	)
};

const animatetop =  {
	'from': {top: '-300px', opacity:0} ,
	'to': {top:0, opacity:1}
  }
  
const Styles = (width) => {
	
	return StyleSheet.create({
		modal: {
			display: "none", 
			position: "fixed",
			zIndex: 1,
			left: 0,
			top: 0,
			width: "100%", 
			height: "100%", 
			overflow: "auto",
			backgroundColor: "#00000066", 
		  },
		  modalContent: {
			position: 'relative',
			backgroundColor: "#fefefe",
			margin: "15% auto", 
			padding: "20px",
			border: "1px solid #888",
			width: width,
			animationName: [animatetop],
        	animationDuration: '0.4s, 1200ms',
			color: "#000000",
			borderRadius: "10px"
		  },
		  modalHeader: {
			display: "flex",
			justifyContent: "flex-end"
		  },
		  show:{
			display: "block"
		  },
		 
		 
	});
};

export default Modal;
