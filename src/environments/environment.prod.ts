// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from '../app/models/environment-configuration';

const serverUrl = 'https://localhost:44334';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
  adb2cConfig: {
    clientId: 'dd11c48c-4892-4571-8f2f-b9e71197c38d',
    readScopeUrl:
      'https://eventsAzureb2c.onmicrosoft.com/dev/eventswalnut/api/Events.Read',
    writeScopeUrl:
      'https://eventsAzureb2c.onmicrosoft.com//dev/eventswalnut/api/Events.Write',
    scopeUrls: [
      'https://eventsAzureb2c.onmicrosoft.com/dev/eventswalnut/api/Events.Read',
      'https://eventsAzureb2c.onmicrosoft.com/dev/eventswalnut/api/Events.Write',
    ],
    apiEndpointUrl: 'https://localhost:44334',
  },
  cacheTimeInMinutes: 30,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
