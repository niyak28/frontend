// src/services/speechService.js
import { api } from './api';

const DEFAULT_USER_ID = 1; // swap this out once auth is set up

export const speechService = {
  // Sends spoken transcript to Gemini text endpoint
  sendTranscript: (transcript) =>
    api.post('/text', {
      query: transcript,
      user_id: DEFAULT_USER_ID,
    }),

  // Sends an image file to Gemini image endpoint
  sendImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('user_id', DEFAULT_USER_ID);

    return api.post('/gemini-image/', formData, {
      headers: {}, // let the browser set Content-Type with the boundary for multipart
    });
  },
};