export enum AuthStep {
  Login = 'login',
  Signup = 'signup',
  PasswordRecovery = 'password-recovery',
}

export interface AuthUser {
  email: string;
  password: string;
}
