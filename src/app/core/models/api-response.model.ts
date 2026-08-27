import { JwtPayload } from 'jwt-decode';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface TokenPayload extends JwtPayload {
  id: number;
  roles: ('user' | 'admin')[];
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
    token: string;
  });

export interface UserThemeData {
  id: number;
  userId: number;
  themeId: number;
  isCertified: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface UserCursusData {
  id: number;
  userId: number;
  cursusId: number;
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

export interface UserLessonData {
  id: number;
  userId: number;
  lessonId: number;
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  updatedBy: number | null;
}

// For Logs saved in MongoDB

export const LOG_LEVELS = ['info', 'warn', 'error'] as const;
export const LOG_TYPES = ['audit', 'auth', 'error'] as const;
export const LOG_EVENTS = [
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
  'DATABASE_ERROR',
  'USER_ROLE_CHANGED',
] as const;

export type LogLevel = typeof LOG_LEVELS[number];
export type LogType = typeof LOG_TYPES[number];
export type LogEvent = typeof LOG_EVENTS[number];
type ModelList = 'User' | 'Theme' | 'Cursus' | 'Lesson' | 'Element' | 'Text' | 'Image' | 'UserTheme' | 'UserCursus' | 'UserLesson';
type RoleList = 'user' | 'admin';

interface BaseLog {
  _id: string;
  createdAt: string;
  event: LogEvent;
  level: LogLevel;
  type: LogType;
  userId?: string;  // the id of the user who generated the log
}

export type StoredLog = 
  BaseLog & (
    | {
        event: LogEvent & 'LOGIN_SUCCESS';
        level: LogLevel & 'info';
        type: LogType & 'auth';
        userId: string;
        metadata: {
          ip: string;
        };
      }
    | {
        event: LogEvent & 'LOGIN_FAILED';
        level: LogLevel & 'warn';
        type: LogType & 'auth';
        metadata: {
          ip: string;
          email: string;
        };
      }
    | {
        event: LogEvent & 'DATABASE_ERROR';
        level: LogLevel & 'error';
        type: LogType & 'error';
        metadata: {
          model: ModelList;
          operation: string; // for example : 'findAll', 'delete', 'add', 'update',...
          errorCode: string; // for example : 'ER_DUP_ENTRY',...
        };
      }
    | {
        event: LogEvent & 'USER_ROLE_CHANGED';
        level: LogLevel & 'info';
        type: LogType & 'audit';
        userId: string;
        metadata: {
          targetUserId: string;
          oldRole: RoleList;
          newRole: RoleList;
        };
      }
  );