import axios from 'axios';
import { ChatMessage } from '../types/study';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatService = {
  async sendMessage(message: string, studyId?: string): Promise<ChatMessage> {
    const response = await api.post('/chat/message', {
      message,
      studyId,
    });
    return response.data;
  },

  async getChatHistory(studyId?: string): Promise<ChatMessage[]> {
    const response = await api.get('/chat/history', {
      params: { studyId },
    });
    return response.data;
  },

  async clearChatHistory(): Promise<void> {
    await api.delete('/chat/history');
  },
};