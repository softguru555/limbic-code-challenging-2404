import { observable, action, computed, makeObservable } from "mobx"
export class AuthStore {
  isLoading = false
  token = ''
  id = ''
  email = ''
  username = ''
  role = ''
  errors = undefined

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      token: observable,
      id: observable,
      email: observable,
      username: observable,
      role: observable,
      errors: observable,
      loadAuth: action,

    });
  }

  loadAuth(data) {
    this.token = data.token;
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.role = data.role;

  }

}
