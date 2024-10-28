import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 
import { AppModule } from './app/app.module';
// import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appConfig } from './app/app.config';
 
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error('err',err));

// platformBrowser().bootstrapModule(AppModule);

bootstrapApplication(AppComponent,appConfig).catch(err => console.error('err',err))