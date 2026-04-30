import api from './api';

const DEFAULT_USER_ID = 1;

const speechService = {
  sendImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('user_id', DEFAULT_USER_ID);
    return api.post('/image', formData, { headers: {} });
  },
};

export default speechService;
