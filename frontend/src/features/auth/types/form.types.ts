export interface IAuthFormData {
  email: string;
  password: string;
}

export interface IForgotPasswordFormData {
  email: string;
}

export interface IResetPasswordFormData {
  password: string;
  repeatPassword: string;
}
