// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: true,
  firebase: {
    apiKey: 'AIzaSyCP-ZVL7_qG_fcbYJ9H1FGInUnnSmXSTuQ',
    authDomain: 'chromagraphix-43a1e.firebaseapp.com',
    databaseURL: 'https://chromagraphix-43a1e.firebaseio.com',
    projectId: 'chromagraphix-43a1e',
    storageBucket: 'chromagraphix-43a1e.appspot.com',
    messagingSenderId: '1048646267456'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
