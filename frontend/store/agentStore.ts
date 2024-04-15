import { observable, action, computed, makeObservable } from "mobx"
type User = {
  id: string;
  email: string;
  username: string;
  role: string;
}
export class AgentStore {
  tempUsers = observable.map()
  isLoading = false
  currentUser?: User
  errors = undefined

  constructor() {
    makeObservable(this, {
      tempUsers: observable,
      isLoading: observable,
      errors: observable,
      users: computed,
      loadAgent: action,
      delAgent: action

    });
  }

  get users() {
    const ret = []
    const values: any = this.tempUsers.values();
    for (let value of values) {
      ret.push(value);
    }
    console.log("ret", ret)
    return ret;
  }

  loadAgent(data: any) {
    console.log("tempUsers", data)

    this.tempUsers = data;
  }

  delAgent(id: string) {
    for (let user of this.users) {
      if (user.id == id) {
        const indexOf = this.users.indexOf(user)
        this.users.splice(indexOf, 1)
      }
    }
    this.loadAgent(this.users)

  }
}

export const handleAngent = new AgentStore();
// export default new QuestionStore();