import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
// import Container from './Container';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem';
// import Notification from './Notification';
// import Button from './Button';

class App extends Component {
  state = {
    searchQuery: '',
    // fetchPage: 1,
    // pictures: [],
    // loading: false,
  };

  componentDidMount() {
    // this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    // const prevQuery = prevState.searchQuery;
    // const prevPage = prevState.fetchPage;
    // const currentQuery = this.state.searchQuery;
    // const currentPage = this.state.fetchPage;
    // if (prevQuery !== currentQuery || prevPage !== currentPage) {
    //   this.fetchImages();
    // }
  }

  componentWillUnmount() {}

  // async fetchImages() {
  //   const { searchQuery, fetchPage } = this.state;
  //   const url = 'https://pixabay.com/api/';
  //   const key = '24488869-ab3c2489f9260f0be3e523737';

  //   this.setState({ loading: true });
  //   await fetch(
  //     `${url}?q=${searchQuery}&page=${fetchPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=6`
  //   )
  //     .then(res => res.json())
  //     .then(res => {
  //       return this.setState(prevState => {
  //         return { pictures: [...prevState.pictures, ...res.hits] };
  //       });
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     })
  //     .finally(() => this.setState({ loading: false }));
  // }

  inputSubmitHandler = submitValue => {
    this.setState({ searchQuery: submitValue });
    // this.setState({ pictures: [] });
  };

  // loadMoreHandler = () => {
  //   this.setState(prevState => {
  //     return { fetchPage: (prevState.fetchPage += 1) };
  //   });
  // };

  render() {
    // const pictures = this.state.pictures;

    return (
      <>
        <Searchbar onSubmit={this.inputSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />

        {/* {this.state.loading && <h2>Loading...</h2>} */}
        {/* {pictures.length >= 1 && <Button onClick={this.loadMoreHandler} />} */}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
