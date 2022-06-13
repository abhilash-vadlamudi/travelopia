// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const { version } = require('../../package.json');

export const environment = {
  ENV: 'LOCAL',
  production: false,
  baseUrl: 'http://localhost:4003/'
  , locale: 'en',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  version: `V${version}`,
  appUrl: 'http://localhost:4200/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
