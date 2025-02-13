import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wfc-buttons',
  templateUrl: './buttons.component.html',
  imports: [MatButtonModule],
})
export class ButtonsComponent {
    startButtonClick = output()
    resetbuttonClick = output()
}
