import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import { toast } from 'react-toastify';
// import Notification from '../Notification';

class ImageGallery extends Component {
  state = {
    fetchPage: 1,
    loading: false,
    pictures: [],
    error: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const currentSearchQuery = this.props.searchQuery;
    const prevPage = prevState.fetchPage;
    const currentPage = this.state.fetchPage;

    if (prevSearchQuery !== currentSearchQuery) {
      this.setState({ pictures: [] });
      this.fetchImages();
    }

    if (prevPage !== currentPage) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { searchQuery } = this.props;
    const { fetchPage } = this.state;
    const url = 'https://pixabay.com/api/';
    const key = '24488869-ab3c2489f9260f0be3e523737';

    this.setState({ loading: true });
    await fetch(
      `${url}?q=${searchQuery}&page=${fetchPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=6`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Нет картинки с именем ${searchQuery}`)
        );
      })
      .then(res => {
        console.log('res', res);
        if (res.hits.length === 0) {
          return toast.error(`Нет картинки с именем ${searchQuery}`);
        }
        return this.setState(prevState => {
          return { pictures: [...prevState.pictures, ...res.hits] };
        });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  loadMoreHandler = () => {
    this.setState(prevState => {
      return { fetchPage: (prevState.fetchPage += 1) };
    });
  };

  render() {
    const { pictures, loading, error } = this.state;

    return (
      <>
        {error && <h1>{error.message}</h1>}
        {pictures && (
          <ul className={s.gallery}>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                id={picture.id}
                imgSrc={picture.webformatURL}
                tags={picture.tags}
              />
            ))}
          </ul>
        )}

        {loading && <h2>Loading...</h2>}
        {pictures.length >= 1 && <Button onClick={this.loadMoreHandler} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
