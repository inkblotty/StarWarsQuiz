export interface SingleQuizField {
  correctAnswer: string; // should match one of the options' values
  errored?: boolean;
  label: string;
  name: string;
  options?: {
    label: string;
    name: string;
    value: string;
  }[];
  value?: string;
  type: string;
};
export interface QuizState {
  [key: string]: SingleQuizField;
};
export interface SingleActionField {
  errored?: boolean;
  key: string;
  value?: string;
};
export interface QuizAction {
  quizData?: QuizState;
  field?: SingleActionField;
  type: 'init' | 'error' | 'success';
};

