export interface Task {
  id: number;
  content: string;
  archived: boolean;
  complete: boolean;
  created: Date;
  modified: Date;
}

export interface SerialisedTask {
  id: number;
  content: string;
  archived: number;
  complete: number;
  created: string;
  modified: string;
}
