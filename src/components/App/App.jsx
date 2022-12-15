import React, { Component } from 'react';
 
import { ThemeProvider } from 'styled-components';
import { theme } from '../Styled/Theme';
import { GlobalStyle } from '../Styled/GlobalStyle';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from '../Searchbar/Searchbar';
import { Fetch } from 'services/Api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';



export class App extends Component {
 state = {
    images: [],
    isLoading: false,
    valueSearch: '',
    page: 1,
    modal: false,
    Img: '',
   Alt: '',
   
    
  };
 
async componentDidUpdate(_, prevState) {
  const { valueSearch, page } = this.state;
    if (prevState.valueSearch !== valueSearch || prevState.page !== page) {
      try {
        if (valueSearch !== '') {
          this.setState({isLoading: true });
          const searchImages = await Fetch(valueSearch, page);
          if (searchImages.length === 0) {
            toast.error(`Вибачте, по вашому запиту нічого не знайдено ;( `);
          }
          this.setState(({ images }) => {
            return {
              images: [...images, ...searchImages],
            };
            
          });
        }
      } catch (error) {
        toast.error( `${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }


  handleSubmit = valueSearch => {
    this.setState({
      images: [],
      page: 1,
      valueSearch,
    });
  };

  handleClickMore = () => {
    this.setState(prevState  => ({ page: prevState.page + 1 }));
  };

  handleClickImage = e => {
    this.setState({
      modal: true,
      Alt: e.target.alt,
      Img: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modal: false,
      Img: '',
      Alt: '',
    });
  };

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.handleModalClose();
  //   } 
  // };

// handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//      this.handleModalClose();
//     }
//   };
//  async componentDidMount() {
//    window.addEventListener('keydown', this.handleKeyDown);

//   };

// componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
// }


  render() {
    const {isLoading, images,  modal, Img, Alt} = this.state;
    return (<ThemeProvider theme={theme}> <GlobalStyle />
      <Searchbar onSubmit={this.handleSubmit} /><ToastContainer />
    
        {images.length > 0 &&  <ImageGallery onClick={this.handleClickImage}
        images={images} />}
       {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleClickMore}  />}
        {modal ? ( <Modal
            src={Img}
            alt={Alt}
            handleModalClose={this.handleModalClose}
          />
        ) : null}
   </ThemeProvider> );
  }
}