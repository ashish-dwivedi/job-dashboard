import { User } from './user';

export interface JobListItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  assignee?: User;
}
