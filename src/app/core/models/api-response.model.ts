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

  createdAtDate: string;
  createdAtTime: string;
  createdByName: string;

  updatedAtDate: string;
  updatedAtTime: string;
  updatedByName: string;
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

  createdAtDate: string;
  createdAtTime: string;
  createdByName: string;

  updatedAtDate: string;
  updatedAtTime: string;
  updatedByName: string;
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

  createdAtDate: string;
  createdAtTime: string;
  createdByName: string;

  updatedAtDate: string;
  updatedAtTime: string;
  updatedByName: string;
}

interface BaseElement {
  id: number;
  lessonId: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;

  createdAtDate: string;
  createdAtTime: string;
  createdByName: string;

  updatedAtDate: string;
  updatedAtTime: string;
  updatedByName: string;
}

export type ElementData =
  | (BaseElement & {
    type: 'text';
    textType: 'title1' | 'title2' | 'title3' | 'paragraph';
    content: string;
  })
  | (BaseElement & {
    type: 'image';
    legend: string | null;
    source: string;
    alternative: string;
  });