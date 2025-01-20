import { ResponseInterface } from 'src/common/domain/interfaces/response-interface';

export const createResponseObj = <T, K>(params: {
  data?: T;
  errorEnum?: K;
  errors?: any;
}): ResponseInterface<T, K> => {
  return {
    data: params.data,
    isError: params.errorEnum !== undefined || params.errors !== undefined,
    errorEnum: params.errorEnum,
    errors: params.errors,
  };
};
