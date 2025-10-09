export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserData {
  id: number;
  firstName: string;        
  lastName: string;
  email: string;
  roles: ('user' | 'admin')[];
  rolesText: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: number | null;
  updatedByName: string;
}

export interface ThemeData {
  id: number;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface CursusData {
  id: number;
  themeId: number;
  name: string;
  price: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface LessonData {
  id: number;
  cursusId: number;
  name: string;
  price: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface ElementData {
  id: number;
  lessonId: number;
  type: 'text' | 'image';
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
  content?: string;
  source?: string;
  alternative?: string;
}