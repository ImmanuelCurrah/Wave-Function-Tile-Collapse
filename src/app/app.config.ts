import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { GRID_SIZE } from '../services/grid service/injection-tokens/grid.tokens';
import { GridService } from '../services/grid service/grid.service';
import { EntropyService } from '../services/entropy service/entropy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    GridService, 
    EntropyService,
    { provide: GRID_SIZE, useValue: 35 },
  ],
};
