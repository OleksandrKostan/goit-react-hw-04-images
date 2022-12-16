import { useState, useEffect} from 'react';
 
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



export function App() {
  const [images, setImages] = useState([ ]);
  const [isLoading, setIsLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [Img, setImg] = useState('');
  const [Alt, setAlt] = useState('');
 
 
   useEffect(() => {
    if (!valueSearch) {
      return;
    }
    setIsLoading(true);
    Fetch(valueSearch, page)
      .then(searchImages => {
        if (searchImages.length === 0) {
          toast.error(`Вибачте, по вашому запиту нічого не знайдено ;( `);
        }
        setImages(prevState => [...prevState, ...searchImages]);
      })
      .catch(error => {
        toast.error(`${error.message}`);
      })
      .finally(() => setIsLoading(false));
  }, [valueSearch, page]);

  

  const handleSubmit = valueSearch => {
    setValueSearch(valueSearch);
    setImages([]);
    setPage(1);
  };

  const handleClickImage = e => {
    setModal(true);
    setImg(e.target.name);
    setAlt(e.target.alt);
  };

  const handleModalClose = () => {
    setModal(false);
    setImg('');
    setAlt('')
  };

    return (<ThemeProvider theme={theme}> <GlobalStyle />
      <Searchbar onSubmit={handleSubmit} /><ToastContainer />
       {images.length > 0 &&  <ImageGallery onClick={handleClickImage} images={images} />}
       {isLoading && <Loader />}
       {images.length > 0 && <Button onClick={() => {setPage(p => p + 1)}}  />}
       {modal ? ( <Modal src={Img} alt={Alt} handleModalClose={handleModalClose}/>) : null}
   </ThemeProvider> );
  }
