import css from './Modal.module.css';
import propTypes from 'prop-types';
import React, { Component } from "react";
import { createPortal } from "react-dom";



const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
 handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.handleModalClose();
    } 
  };

handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     this.props.handleModalClose();
    }
  };
 componentDidMount() {
   window.addEventListener('keydown', this.handleKeyDown);
  };

componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  render() {

    return createPortal(
       <div className={css.Overlay} onClick={this.handleBackdropClick}>
    <div className={css.Modal}>
      <img src={this.props.src} alt={this.props.alt} />
    </div>
  </div>,
      modalRoot,
    );
  }
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