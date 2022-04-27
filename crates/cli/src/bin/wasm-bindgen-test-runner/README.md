# mk-mv-backend-poc

# Requirements

Install the npm modules:

`npm i`

## NPM Scripts
### `npm run build:watcher`
Run build watcher that will trigger rebuild based on rs file

### `npm run build`
Packages js and ts files
###  `npm run dev`
Runs build and run script which:
- Packages js/ts code
- Starts windowless Wonderland Editor
  - Builds wonderland project
  - Starts server
  - Listens for changes to js folder for hot reloading
- Opens browser to `localhost:8080`

End process by pressing `ctrl+c` in terminal window
### `npm run dev:flavor <flavor>`
Same as `npm run dev` but ability to specify build flavor
### `npm run clean`
Deletes both the `cache` and `deploy` folders for fresh builds
### `npm run editor` - **USE ONLY WHEN NECESSARY**
Opens project in Wonderland Editor for editing the wlp file


## Build Flavors
Build flavors have been added to the Startup Component (js/components/startup.ts) to aid with development and testing.
### Adding a Flavor
You can add a build flavor by adding your flavor name to the case switch statement in startup.ts along with any code you would like to run.
```
// Flavor specific setups
const queryParams = new URLSearchParams(location.search);
const flavor = queryParams.get("flavor");

if (flavor !== null) console.log("Using flavor", flavor);
switch (flavor) {
    // Add your flavors as cases here
    // e.g case "ide": ideSetup(); break;
    default: break;
}
```
### Building your Flavor
Running the `npm run dev:flavor <flavor>` will build project and run with your flavor. `<flavor>` must match the string you put in the switch case statment in startup.ts.

