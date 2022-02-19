import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  inputSubmitHandler = submitValue => {
    this.setState({ searchQuery: submitValue });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.inputSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
