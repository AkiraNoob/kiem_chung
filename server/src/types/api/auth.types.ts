export type TLocalLoginPayload = {
  email: string;
  password: string;
};

export type TRegisterPayload = {
  email: string;
  password: string;
  fullName: string;
};

export type TJWTPayload = {
  id: string;
  fullName: string;
  email: string;
};

export type TJWTVerify = {
  // seconds create
  iat: number;
  // seconds expired
  exp: number;
} & TJWTPayload;

export type TRefreshJWTPayload = {
  refreshToken: string;
};
