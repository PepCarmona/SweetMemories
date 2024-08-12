export enum AuthStep {
  Login = 'login',
  Signup = 'signup',
  PasswordRecovery = 'password-recovery',
}

export interface LoginUser {
  email: string;
  password: string;
}

export type SignupUser = LoginUser & {
  name: string;
};

export type ExistingUser = {
  email: string;
} & ExistingUserMetadata;

export interface ExistingUserMetadata {
  name: string;
}

export enum AuthStatus {
  LoggedIn = 'logged-in',
  LoggedOut = 'logged-out',
  FailedToSignUp = 'fail-to-sign-up',
  FailedToLogIn = 'fail-to-log-in',
  FailedToRecoverPassword = 'fail-to-recover-password',
}
