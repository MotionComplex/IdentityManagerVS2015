/**
 * Import of the platformBrowserDynamic module
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/**
 * Import of the platformBrowserDynamic module
 */
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);