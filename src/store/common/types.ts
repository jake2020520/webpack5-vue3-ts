export interface State {
  todoData: TodoProps;
}

export interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
