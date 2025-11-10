import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { AlignJustify, ArrowLeft, ArrowRight, LucideAngularModule, Play, Search, Star, X, Clock4 } from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers ?? [],
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ ArrowLeft, ArrowRight, Star, Play, AlignJustify, X, Search, Clock4 }))
  ]
}).catch((err) => console.error(err));
