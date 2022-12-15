import css from './Modal.module.css';
import propTypes from 'prop-types';
import { useEffect } from "react";
import { createPortal } from "react-dom";



const modalRoot = document.querySelector("#modal-root");

export function Modal ({handleModalClose, src, alt}) {
 

const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     handleModalClose();
    }
  };

 useEffect(() => {
    const handleKeyDown = ({ code }) => {
      if (code === 'Escape') {
       handleModalClose();
      }
    }
    return () => {
      window.addEventListener('keydown', handleKeyDown)
    }
  }, [handleModalClose]) 
     


    return createPortal(
       <div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal}>
      <img src={src} alt={alt} />
    </div>
  </div>,
       modalRoot,
    );
  }


// export const Modal = ({ src, alt, handleClose }) => (
//   <div className={css.Overlay} onClick={handleClose}>
//     <div className={css.Modal}>
//       <img src={src} alt={alt} />
//     </div>
//   </div>
// );

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleModalClose: propTypes.func.isRequired,
};