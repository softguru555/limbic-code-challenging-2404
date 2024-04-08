export type FAQ = {
  question: string;
  id: string;
  contents: [{ answer: string, email: string }];
};
