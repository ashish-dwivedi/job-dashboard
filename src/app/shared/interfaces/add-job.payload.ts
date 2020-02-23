import { User } from './user';

export interface AddJobPayload {
  title: string;
  description: string;
  date: string;
  assignee: User;
}
