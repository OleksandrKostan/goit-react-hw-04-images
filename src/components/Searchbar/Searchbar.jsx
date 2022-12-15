import propTypes from 'prop-types';
import css from './Searchbar.module.css';

import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    valueSearch: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.valueSearch);
    // this.reset();
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ valueSearch: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
      />
    </form>
  </header>
    );
  }
}



Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
 






