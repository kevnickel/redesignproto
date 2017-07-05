import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { State } from './state';

@Component({
    selector: 'qual-heatmap',
    templateUrl: './qualityheatmap.component.html',
    styleUrls: ['./qualityheatmap.component.css'],
})
export class QualityHeatMapComponent implements OnChanges, OnInit {
    @Input() state: State;
    excellentScores: number;
    fairScores: number;
    poorScores: number;

    ngOnInit() {
        this.UpdateScores("foo");
    }
    
    ngOnChanges(changes: SimpleChanges) {
        this.UpdateScores("foo");
    }

    private UpdateScores(procedure: string) {
        this.GetExcellentScores(procedure);
        this.GetFairScores(procedure);
        this.GetPoorScores(procedure);
    }
    public GetExcellentScores(procedure: string): void {
        this.excellentScores = Math.floor(Math.random() * (1000 - 1) + 1);
    }

    public GetFairScores(procedure: string): void {
        this.fairScores = Math.floor(Math.random() * (1000 - 1) + 1);
    }

    public GetPoorScores(procedure: string): void {
        this.poorScores = Math.floor(Math.random() * (1000 - 1) + 1);
    }

}