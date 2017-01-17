/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      
      // oauth
      'base64-js': "node_modules/base64-js/lib/b64.js",
      "buffer": "node_modules/buffer/index.js",
      'js-base64': "node_modules/js-base64/base64.js",
      'sha256': "node_modules/sha256/lib/sha256.js",
      'convert-hex': "node_modules/convert-hex/convert-hex.js",
      'convert-string': "node_modules/convert-string/convert-string.js",
      'ieee754': "node_modules/ieee754/index.js",
      'isarray': "node_modules/isarray/index.js",
      'angular2-oauth2/oauth-service': 'npm:angular2-oauth2/oauth-service.js'
      //custom libraries
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: 'main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-oauth2':{
        defaultExtension: 'js'
      },
      'js-base64':{
        defaultExtension: 'js'
      },
      'base64-js':{
        defaultExtension: 'js'
      },
      'convert-hex':{
        defaultExtension: 'js'
      },
      'convert-string':{
        defaultExtension: 'js'
      },
      'sha256':{
        defaultExtension: 'js'
      },
      'anuglar2':{
        defaultExtension: 'js'
    }/*,
      'requirejs':{
        defaultExtension: 'js'
      }*/
    }
  });
})(this);