import { observable, action, computed, makeObservable } from "mobx"

export class QuestionStore {
  isLoading = false
  tempQuestions = observable.map()

  constructor() {
    makeObservable(this, {
      tempQuestions: observable,
      isLoading: observable,
      questions: computed,
      loadQuestions: action,
      delQuestion: action,
      addQuestion: action
    });
  }
  get questions() {
    const ret = []
    const values: any = this.tempQuestions.values();
    for (let value of values) {
      ret.push(value);
    }
    console.log("ret", ret)
    return ret;
  }

  loadQuestions(data: any) {
    this.tempQuestions = data;
  }

  delQuestion(id: any) {
    for (let question of this.questions) {
      if (question._id == id) {
        const index = this.questions.indexOf(question)
        this.questions.splice(index, 1)
      }
    }
    this.loadQuestions(this.questions)
  }
  addQuestion(data: any) {
    this.tempQuestions = data;
  }
}
export const questionhandle = new QuestionStore();