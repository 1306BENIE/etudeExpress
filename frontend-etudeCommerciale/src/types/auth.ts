export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'entrepreneur' | 'student' | 'investor';
  avatar?: string;
  createdAt: string;
  subscription?: {
    plan: 'free' | 'basic' | 'premium';
    expiresAt: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'entrepreneur' | 'student' | 'investor';
}

export interface AuthResponse {
  user: User;
  token: string;
}