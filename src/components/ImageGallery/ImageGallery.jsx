import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
// import s from './ImageGallery.module.css';
import Modal from '../Modal';
import imagesAPI from '../services';
import ImagePendingView from '../ImagePendingView';
import ImageErrorView from '../ImageErrorView';
import ImageIdleView from '../ImageIdleView';
import ImageResolvedView from '../ImageResolvedView';

class ImageGallery extends Component {
  state = {
    fetchPage: 1,
    pictures: [],
    error: null,
    loading: false,
    status: 'idle',
    showModal: false,
    pictureUrl: null,
    tags: null,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const prevPage = prevState.fetchPage;
    console.log('prevPage', prevPage);
    const { searchQuery } = this.props;
    const { fetchPage } = this.state;
    console.log('fetchPage', fetchPage);

    if (prevSearchQuery !== searchQuery) {
      this.setState({ status: 'pending', pictures: [] });
      this.fetchImages(searchQuery, fetchPage);
    }

    if (prevPage !== fetchPage) {
      this.setState({ loading: true });
      this.fetchImages(searchQuery, fetchPage);
    }
  }

  loadMoreHandler = () => {
    // const { fetchPage } = this.state;

    this.setState(prevState => {
      return { fetchPage: (prevState.fetchPage += 1) };

      // this.setState(prev => ({
      //   fetchPage: prev.fetchPage + 1,
      // }));
    });
  };

  fetchImages(searchQuery, fetchPage) {
    imagesAPI(searchQuery, fetchPage)
      .then(res => {
        if (res.hits.length === 0) {
          this.setState({ status: 'idle' });
          return toast.error(`Нет картинки с именем ${searchQuery}`);
        }
        return this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...res.hits],
            status: 'resolved',
          };
        });
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      })
      .finally(() => {
        this.setState({ loading: false });

        if (fetchPage > 1) {
          this.scrollDown();
        }
      });
  }

  scrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal = (modalImg, tags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      pictureUrl: modalImg,
      tags,
    }));
  };
  render() {
    const { pictures, error, loading, status, showModal, pictureUrl, tags } =
      this.state;

    if (status === 'idle') {
      return <ImageIdleView text={'Введите поисковый запрос'} />;
    }

    if (status === 'pending') {
      return <ImagePendingView message={'Loading...'} />;
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={pictureUrl} alt={tags} />
            </Modal>
          )}
          <ImageResolvedView
            pictures={pictures}
            loadMore={this.loadMoreHandler}
            loading={loading}
            openModal={this.toggleModal}
          />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
