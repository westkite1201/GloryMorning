import constants from "./constants";

// let runMode = '-dev';
let runMode = '-stg';
let headEndMode = 'live';  //  // live, test
let appConfig = {
    runMode: runMode,
    app: {
      
    },
}
export default appConfig;

window.AC = appConfig;
