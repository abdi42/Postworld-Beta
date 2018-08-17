import {observable,action,configure,runInAction,computed,when} from "mobx"
import { AsyncStorage, } from 'react-native'
//configure({ enforceActions: true });
import HttpApi from './HttpApi'

const httpApi = new HttpApi();

class AuthStore {

  @observable user = null;
  @observable handle = null;
  @observable phoneNumber = null;
  @observable token = null;

  constructor(){

  }


  @computed get isAuthenticated() {
    return this.user ? true : false
  }

  @action authenticate(user) {
    this.user = user;
  }

  @action signUp(handle) {
    return httpApi.signUp(handle)
      .then((responseJson) => {
        this.handle = handle
        this.sendCode(handle,'4027399291')
      })
  }

  @action sendCode(handle,phoneNumber) {
    return httpApi.sendCode(handle,phoneNumber)
      .then((responseJson) => {
        this.token = responseJson.token;
        this.verifyTwoFactor(handle,this.token)
      })
  }

  @action verifyTwoFactor(handle,token) {
    return httpApi.verifyTwoFactor(handle,token)
      .then((responseJson) => {
        this.user = responseJson.user;
        AsyncStorage.setItem('userToken',JSON.stringify(responseJson.user))
      })
  }
}

export default new AuthStore()
