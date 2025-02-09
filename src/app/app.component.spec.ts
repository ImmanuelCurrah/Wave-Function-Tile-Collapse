import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GridService } from '../services/grid service/grid.service';
import { EntropyService } from '../services/entropy service/entropy.service';
import { GRID_SIZE } from '../services/grid service/injection-tokens/grid.tokens';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        GridService,
        EntropyService,
        { provide: GRID_SIZE, useValue: 45 },
      ],
    }).compileComponents();
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not throw', () => {
    expect(component.start()).not.toThrow()
  });
});
