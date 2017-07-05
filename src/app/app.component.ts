import { Component } from '@angular/core';

import { MapComponent } from './map.component';
import { QualityHeatMapComponent } from './qualityheatmap.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Homepage redesign';
  state = 'WA';
}
