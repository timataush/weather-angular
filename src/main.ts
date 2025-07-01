import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app/app.routes";
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8XEGQL7yNACl5wj9VsPr_-0v5q3kexqc",
  authDomain: "weather-app-41e69.firebaseapp.com",
  projectId: "weather-app-41e69",
  storageBucket: "weather-app-41e69.appspot.com",
  messagingSenderId: "317460239169",
  appId: "1:317460239169:web:b02e207007d246c1a307c0"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));