import { JobListItem } from './job-list-item';
import { Attachment } from './attachment';

export interface Job extends JobListItem {
  attachments: Array<Attachment>;
}
