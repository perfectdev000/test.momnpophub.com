//import axios from 'axios';

export const API_ROOT = process.env.REACT_APP_BASEURL;

export const callApi = (
  endpoint,
  method = 'GET',
  data = {},
  auth = {},
  file = null
) => {
  
  method = method ? method : 'GET';
  let fullUrl = API_ROOT + endpoint;
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': 'value-v',
      'Authorization': auth ? auth : '',
    },
    crossDomain: true,
    method: method,
  };
  if (['POST', 'PUT'].indexOf(method) > -1) 
      options.body = JSON.stringify(data);

  if (file) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    options = {
      method: 'POST',
      body: data
    }
  }
  //console.log('***** API Request', options)
  return fetch(fullUrl, options)
    .then((response) => {
      if (!response.ok) {
        const error = Object.assign({}, response, {
          status: response.status,
          statusText: response.statusText,
        });     
        return Promise.reject(error);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') > -1) {
        return response
          .json()
          .then((json) => {
            //console.log('***** API Response Received', json)
            if ([200, 403].indexOf(response.status) === -1)
              throw new Error(response.status);
            if ([304, 403].indexOf(response.status) > -1)
              // window.location.reload()
              throw new Error(response.status);
            if (Array.isArray(json)) return [...json];
            else return { ...json };
          })
          .catch(() => {
            throw new Error(response.status);
          });
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log('***** Inside Catch', error);
      return error
    });
};
