import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr, ToastrModule } from 'ngx-toastr';  // Import ToastrModule

export const appConfig: ApplicationConfig = {
  
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     provideClientHydration(), provideAnimationsAsync(), 
     provideAnimationsAsync(),provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
     provideAuth(()=> getAuth()),provideFirestore(() => getFirestore()),provideToastr()]
};
