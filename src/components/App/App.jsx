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
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [Img, setImg] = useState('');
  const [Alt, setAlt] = useState('');
 
 
  useEffect(() => {
    if (!valueSearch) {
      return 
    }
    try {
      if (valueSearch !== '') {
      
        setIsLoading(true)
        const searchImages = Fetch(valueSearch, page);
        if (searchImages.length === 0) {
          toast.error(`Вибачте, по вашому запиту нічого не знайдено ;( `);
        }
        setImages(prevImages => [...prevImages, ...images]);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setIsLoading(false)
    }
  }, [valueSearch, page, images]);

  

  const handleSubmit = valueSearch => {
    setValueSearch(valueSearch);
    setImages([]);
    setPage(1);
  };

 const handleClickMore = () => {
  setPage(p => p  + 1)
  };

  const handleClickImage = e => {
    setModal(true);
    setImg(e.target.alt);
    setAlt(e.target.name);
  };

  const handleModalClose = () => {
    setModal(false);
    setImg('');
    setAlt('')
  };

    return (<ThemeProvider theme={theme}> <GlobalStyle />
      <Searchbar onSubmit={handleSubmit} /><ToastContainer />
    
        {images.length > 0 &&  <ImageGallery onClick={handleClickImage}
        images={images} />}
       {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={handleClickMore}  />}
        {modal ? ( <Modal
            src={Img}
            alt={Alt}
            handleModalClose={handleModalClose}
          />
        ) : null}
   </ThemeProvider> );
  }
