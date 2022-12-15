import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loader}>
    <ThreeDots 
height="100" 
width="100" 
radius="9"
color="#2c2cb7" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
  </div>
);