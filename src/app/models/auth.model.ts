export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  expiresAt: string;
}
