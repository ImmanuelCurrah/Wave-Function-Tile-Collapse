import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Grid } from '../../../services/grid service/utils/tile.util';

@Component({
  selector: 'wfc-grid',
  templateUrl: './grid.component.html',
  imports: [CommonModule, MatGridListModule],
})
export class GridComponent {
  numberOfColumns: InputSignal<number> = input(0);
  grid: InputSignal<Grid | undefined> = input();
}
