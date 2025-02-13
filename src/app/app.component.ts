import { Component, computed, Signal } from '@angular/core';
import { GridService } from '../services/grid service/grid.service';
import { Grid } from '../services/grid service/utils/tile.util';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CollapseService } from '../services/collapse service/collapse.service';
import { GridComponent } from './components/grid/grid.component';
import { ButtonsComponent } from './components/burttons/buttons.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatGridListModule, GridComponent, ButtonsComponent],
  providers: [CollapseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  generatedGrid: Grid;
  numberOfColumns: Signal<number>;

  constructor(
    private readonly gridService: GridService,
    private readonly collapseService: CollapseService
  ) {
    this.generatedGrid = this.gridService.generatedGrid();
    this.numberOfColumns = computed(() => Math.sqrt(this.generatedGrid.length));
  }

  start(): void {
    this.collapseService.collapse();
  }

  reset(): void {
    this.collapseService.resetGrid();
  }
}
