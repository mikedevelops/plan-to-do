export interface Task {
  id: number;
  content: string;
  archived: boolean;
  complete: boolean;
  created: Date;
  modified: Date;
}

export interface TaskResponseModel {
  id: number;
  content: string;
  archived: boolean;
  complete: boolean;
  created: string;
  modified: string;
}
