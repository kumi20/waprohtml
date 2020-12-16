// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  domain: 'https://wpmyaccountapi.wapro.ingress.k8s-dev.abs.assecobs.pl/api/',

  app_url: '<APP_URL>', //Example: https://myapp.com
  cas_url: '<CAS_URL>', //Example: https://mycas.com/cas
  cas_validate_url: '<CAS_VALIDATE_TICKET>' //Example: https://mycas.com/cas/serviceValidate
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
