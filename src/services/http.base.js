import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
        baseURL:'http://192.168.1.102/demo/wp-json'
      
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
      console.log(error)
    // switch (error.response.status) {
    //   case 401:
    //     this.redirectTo(document, '/')
    //     break;
    //   case 404:
    //     this.redirectTo(document, '/404')
    //     break;
    //   default:
    //     this.redirectTo(document, '/500')
    //     break;
    // }
    return Promise.reject(error)
  }

//   redirectTo = (document, path) => {
//     document.location = path
//   }
  
  get(path) {
    return this.service.get(path);
  }

  patch(path, payload, callback) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }
}

export default new Service;