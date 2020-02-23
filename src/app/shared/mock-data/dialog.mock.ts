import { of } from 'rxjs';

// prettier-ignore
export class MockDialog {
  open = () => {
    return {
      afterClosed: () => of({}),
      close: () => {},
    };
  }
}
