export interface InputProps {
  dataValue: string;
  updateValueFunction: Function;
}

export interface CommentFormProps {
  setTrigger: Function;
}

export interface CommentPageProps {
  trigger: boolean;
  setTrigger: Function;
}
export interface CommentProp {
  comment: CommentItem;
}

export interface CommentItem {
  name: string;
  message: string;
  createdAt: Date;
  _id: string;
}

export interface DeleteButtonProp {
  setTrigger: Function;
}
