export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormData {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  otp?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    jwt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface TokenPayload {
  exp: number;
  iat: number;
  userId: string;
  // Add other token payload fields as needed
} 