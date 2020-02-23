import { of } from 'rxjs';

export class MockJobService {
  getAllJobs = () => of([]);
  getJobDetails = () => of({});
  addJob = () => of({});
}
