export enum AuthStep {
  Login = 'login',
  Signup = 'signup',
  PasswordRecovery = 'password-recovery',
}

export interface AuthUser {
  email: string;
  password: string;
}

export enum AuthStatus {
  LoggedIn = 'logged-in',
  LoggedOut = 'logged-out',
  FailedToSignUp = 'fail-to-sign-up',
  FailedToLogIn = 'fail-to-log-in',
  FailedToRecoverPassword = 'fail-to-recover-password',
}
