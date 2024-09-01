export interface ToastConfig {
  content: string;
  variant: ToastVariant;
}

export enum ToastVariant {
  Error = 'error',
}
