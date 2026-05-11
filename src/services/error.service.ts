import { AxiosError } from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    if (err.code === 'ERR_NETWORK') {
      return 'Servidor indisponível';
    }

    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    if (err.response?.data?.error) {
      return err.response.data.error;
    }

    switch (err.response?.status) {
      case 400:
        return 'Requisição inválida';

      case 401:
        return 'Sessão expirada';

      case 403:
        return 'Acesso negado';

      case 404:
        return 'Recurso não encontrado';

      case 500:
        return 'Erro interno do servidor';

      default:
        return 'Erro inesperado';
    }
  }

  return 'Erro inesperado';
};
