import React, { Component } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  inputChangeHandler = e => {
    this.setState({ inputValue: e.target.value.toLowerCase() });
  };

  formSubmitHandler = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return toast.error('Enter your request, please');
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <>
        <header className={s.searchbar}>
          <form className={s.SearchForm} onSubmit={this.formSubmitHandler}>
            <button type="submit" className={s.SearchFormButton}>
              <RiSearch2Line className={s.SearchFormIcon} />
            </button>

            <input
              className={s.SearchFormInput}
              type="text"
              name="searchInput"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputValue}
              onChange={this.inputChangeHandler}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
