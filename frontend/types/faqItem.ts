import { FAQ } from "./faq";

export type FaqItem = {
  active: string | null;
  handleToggle: (index: string) => void;
  faq: FAQ;
};
