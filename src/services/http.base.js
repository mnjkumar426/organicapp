import axios from 'react-native-axios';
// import {startLoading1,stopLoading2} from '../redux/actions/loading.action'
  import store from '../redux/store'
import { startLoading, stopLoading } from '../redux/reducers/loading.reducer'
import { ToastAndroid } from 'react-native';
import { IMAGE_BASE_URL } from '../constants/constant';
const Entities = require('html-entities').AllHtmlEntities;


const entitie=new Entities();

class Service {
  //  dispatch=()=>{}
  constructor() {
    let service = axios.create({
        baseURL:IMAGE_BASE_URL,
        headers:{
          'Content-Type':'application/json'
        }
        
      
    });
   
    service.interceptors.response.use(this.handleSuccess,this.handleError);
    service.interceptors.request.use(req => {
      let defaultLocation=store.getState().auth.defaultLocation?store.getState().auth.defaultLocation.id:null
      req.params={...req.params,
                  location: defaultLocation
     }

     let token= store.getState().auth.user ?store.getState().auth.user.token:null
     
     console.log("token =====",token)
     if(token){
     req.headers={
       ...req.headers,
       Authorization: 'Bearer '+token.access_token
     }
    }



      return req;
    });
    this.service = service;
  }

  handleSuccess(response) {
    console.log("response.data============",response.data)
  store.dispatch(stopLoading())
    return response.data;
  }

  handleError = (error) => {
    try {
      
   
    store.dispatch(stopLoading())
      //console.log(error)
      let message=error.response.data && error.response.data.message?error.response.data.message:error.message;
      console.log("Error Message====",message);
    ToastAndroid.show(entitie.decode(message),ToastAndroid.BOTTOM, ToastAndroid.LONG)
    return Promise.reject(error)
  } catch (error) {
    store.dispatch(stopLoading())
  }
  }

//   redirectTo = (document, path) => {
//     document.location = path
//   }
  
  get(path,loading=true) {
   
   // if(loading){
    store.dispatch(startLoading())
   // }
    console.log("call end ",path)
    console.log("service",this.service)

    return this.service.get(path);
  }

  patch(path, payload) {
    store.dispatch(startLoading())
     this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((res)=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }


  post(path, payload) {
    console.log("call end ",path,payload)
   // store.dispatch(startLoading())
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    })
  }

  put(path, payload) {
    console.log("call end ",path,payload)
   // store.dispatch(startLoading())
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload
    })
  }

  login(username,password){

    return   axios.post(IMAGE_BASE_URL+"user/login?type=mobile", {},
    {auth: {
     username: username,
     password: password
   }})
   
   
   
   
      
     }
}


export default  Service;
 export const API=new Service;
