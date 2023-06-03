import { makeObservable, observable, action } from 'mobx';

class AuthStore {
  accessToken = '';

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      setAccessToken: action,
    });
  }

  setAccessToken(token) {
    this.accessToken = token;
  }
}

const authStore = new AuthStore();
export default authStore;