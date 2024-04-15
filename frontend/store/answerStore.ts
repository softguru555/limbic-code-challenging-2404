import { observable, action, computed, makeObservable } from "mobx"

export class AnswerStore {
  isLoading = false
  tempAnswers = observable.map()

  constructor() {
    makeObservable(this, {
      tempAnswers: observable,
      isLoading: observable,
      answers: computed,
      loadAnswers: action,
      delAnswer: action,
      addAnswer: action
    });
  }
  get answers() {
    const ret = []
    const values: any = this.tempAnswers.values();
    for (let value of values) {
      ret.push(value);
    }
    console.log("ret", ret)
    return ret;
  }

  loadAnswers(data: any) {
    this.tempAnswers = data;
  }

  delAnswer(id: any) {
    for (let answer of this.answers) {
      if (answer._id == id) {
        const index = this.answers.indexOf(answer)
        this.answers.splice(index, 1)
      }
    }
    this.loadAnswers(this.answers)
  }
  addAnswer(data: any) {
    this.tempAnswers = data;
  }
}
export const answerHandle = new AnswerStore();