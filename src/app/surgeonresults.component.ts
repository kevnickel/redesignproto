import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';

import { State } from './state';
import { ProcedureCategory } from './procedure-category';
import { StateService } from './services/states.service';
import { SurgeonScore } from './surgeon-score';
import { MpiricaService } from './services/mpirica.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'surgeon-results',
    templateUrl: './surgeonresults.component.html',
    styleUrls: ['./surgeonresults.component.css']
})
export class SurgeonResultsComponent implements OnInit {

    private state: State;
    private procedureCategoryName: string;

    private results: SurgeonScore[];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private stateService: StateService,
        private mpiricaService: MpiricaService
    ) { 
        this.state = new State();
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.stateService.getState(params['id']))
            .subscribe(state => this.state = state);
        
        this.route.params.subscribe( params =>
            this.procedureCategoryName = params['id1']);

        this.route.params
            .switchMap((params: Params) => this.mpiricaService.getScoresForProcedure(params['id1']))
            .subscribe(results => this.results = results);
    }
}
