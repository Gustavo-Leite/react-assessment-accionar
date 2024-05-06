export const errorInterceptor = (error) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Connection Error.'));
  }

  if (error.response && error.response.status === 401) {
    return Promise.reject(new Error('Unauthorized.'));
  }

  if (error.response && error.response.status === 403) {
    return Promise.reject(new Error('Forbidden.'));
  }

  if (error.response && error.response.status === 500) {
    return Promise.reject(new Error('Internal Server Error.'));
  }

  return Promise.reject(error);
};
