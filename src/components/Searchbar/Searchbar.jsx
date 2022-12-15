import propTypes from 'prop-types';
import css from './Searchbar.module.css';

import { useState } from "react";

export function Searchbar ({onSubmit}) {
  const [valueSearch, setValueSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    
    onSubmit(valueSearch);
    reset()
  };

  const reset = () => {
    setValueSearch('')
  };
  const handleChange = e => setValueSearch(e.currentTarget.value.toLowerCase());
 
    return (
      <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={css.SearchForm_button}>
        <span className={css.SearchForm_button_label}>Search</span>
      </button>

      <input
        name="valueSearch"
        className={css.SearchForm_input}
        type="text"
        autoComplete="off"
        autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
      />
    </form>
  </header>)
};



Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
 






