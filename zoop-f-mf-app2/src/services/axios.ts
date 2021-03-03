import axios from 'axios';

export const initAxios = (): void => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // // Add api-token and unique uuidv4 on each request
  // axios.interceptors.request.use(
  //   function (AxiosRequestConfig) {
  //     AxiosRequestConfig.headers.common = {
  //       ...AxiosRequestConfig.headers.common,
  //       'X-Request-ID': uuidv4(),
  //       'api-token': localStorage.getItem(TOKEN),
  //     };
  //     return AxiosRequestConfig;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   },
  // );

  // // Set api-token accordingly to backend header response
  // axios.interceptors.response.use(function (response) {
  //   const localStorageToken = localStorage.getItem(TOKEN);
  //   const headerToken = response.headers['api-token'];
  //   const loginFlag = response.headers['loggedin'];

  //   if (headerToken && !loginFlag) {
  //     // We don't have a token
  //     if (!localStorageToken) {
  //       // then it is a New session, set the session token in localstorage.
  //       localStorage.setItem(TOKEN, headerToken);
  //     } else {
  //       // We have a token but its different from what the header says (session not found)
  //       if (headerToken !== localStorageToken) {
  //         // It means the old token is not associated to a session, we replace it and we refresh everything.
  //         localStorage.removeItem(TOKEN);
  //         localStorage.setItem(TOKEN, headerToken);
  //         window.location.href = '/';
  //       }

  //       // We have a token and receive an empty string (session invalid)
  //       if (headerToken === '') {
  //         // It means the old token is invalid, we refresh everything.
  //         localStorage.removeItem(TOKEN);
  //         window.location.href = '/';
  //       }
  //     }
  //   }

  //   if (headerToken && loginFlag === 'true') {
  //     // We just loggedin and need to replace the token.
  //     localStorage.removeItem(TOKEN);
  //     localStorage.setItem(TOKEN, headerToken);
  //   }

  //   return response;
  // });
};
