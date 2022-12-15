import propTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => (
  <div className={css.btnCenter}><button className={css.Button} onClick={onClick} type="button">
    Load more
  </button></div>
);
Button.propTypes = {
  onClick: propTypes.func.isRequired,
};


 
