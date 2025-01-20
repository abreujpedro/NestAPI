export interface ResponseInterface<T, K> {
  data?: T;
  isError: boolean;
  errorEnum?: K;
  errors?: any;
}
