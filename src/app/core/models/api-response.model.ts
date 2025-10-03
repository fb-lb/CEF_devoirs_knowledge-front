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