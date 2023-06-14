export interface TopicInputs {
  name: string;
}

export interface UserInputs {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  description: string;
  userType?: string;
  avatar?: string;
}

export interface PostInputs {
  title: string;
  topic: string;
  content: string;
}
