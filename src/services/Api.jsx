import axios from 'axios';

export const Fetch = async (query, page, ) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: `${query}`,
      page: `${page}`,
      key: '30471998-a8edceaaf22ac8084f766fdc6',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  const { hits } = response.data;
  const data = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));
  return data;
};