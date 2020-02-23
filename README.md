# Job Dashboard

Angular based jobs dashboard. Features 2 views and a dialog.
Project has the readiness to support REST Apis and GraphQL queries both.
By default it runs ont the REST Apis.

### Dashboard

Lists down all the added jobs in a tabular layout.

### Add Job

Dialog to add new jobs. Has form validations and HTTP operation to save the added job

### Details

Lists down all the details of a job.

## Running project

Run the command `npm install` to install all the dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Project has unit test supported by `Jest`.

To run the unit tests run the command `npm run test`

To check the test coverage run the command `jest --coverage`

## Running end-to-end tests

E2E testing is on Cypress.

To run the e2e tests, run the command `npm run e2e`.

Additionally, to run the tests in a browser, run the command `cypress run --browser chrome`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
