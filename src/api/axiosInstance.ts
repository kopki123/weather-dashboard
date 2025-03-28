import axios, { AxiosError, AxiosResponse } from 'axios';

enum RestRequestErrorCode {
  OFFLINE = 0,
  TIMEOUT = -1,
  UNKNOWN = -999,
}

const errorMessages = {
  [RestRequestErrorCode.OFFLINE]: '沒有網路連線',
  [RestRequestErrorCode.TIMEOUT]: '連線逾時，請稍後再試',
  [RestRequestErrorCode.UNKNOWN]: '未知錯誤',
};

const axiosInstance = axios.create({
  timeout: 10 * 1000, // 10s
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError): AxiosError => {
  const { code } = error;
  let message = '';

  switch (code) {
    case 'ERR_NETWORK':
      message = errorMessages[RestRequestErrorCode.OFFLINE];
      break;
    case 'ECONNABORTED':
      message = errorMessages[RestRequestErrorCode.TIMEOUT];
      break;
    default:
      message = errorMessages[RestRequestErrorCode.UNKNOWN];
  }

  throw new AxiosError(message);
});

export default axiosInstance;
