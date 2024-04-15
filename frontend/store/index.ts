import { handleAngent, AgentStore } from './agentStore';
import { QuestionStore, questionhandle } from './questionStore';
import { AnswerStore, answerHandle } from './answerStore';

export type RootStore = {
  handleAngent: AgentStore;
  questionhandle: QuestionStore;
  answerHandle: AnswerStore
}

const rootStore: RootStore = {
  handleAngent,
  questionhandle,
  answerHandle
};

export default rootStore;