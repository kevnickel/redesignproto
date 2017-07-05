import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as topojson from "topojson";
import * as d3 from 'd3';
import * as d3tip from 'd3-tip';
import * as d3geo from 'd3-geo';

import { State } from './state';
import { StateService } from './services/states.service';
import { ProcedureCategoryService } from './services/procedure-categories.service';
import { ProcedureCategory } from './procedure-category';

@Component({
    selector: 'mp-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    states: State[];
    procedureCategories: ProcedureCategory[];
    hoveredState: State;
    selectedProcedure: ProcedureCategory;

    constructor(
        private stateService: StateService,
        private procedureCategoryService: ProcedureCategoryService,
        private route: ActivatedRoute,
        private router: Router) {
        this.hoveredState = new State();
        this.selectedProcedure = new ProcedureCategory();
    }

    ngOnInit() {
        this.getProcedureCategories();
        this.getStates();
        this.draw();
    }

    public getProcedureCategories(): void {
        this.procedureCategoryService.getProcedureCategories().then(pc => this.procedureCategories = pc);
    }

    public getStates(): void {
        this.stateService.getStates().then(states => this.states = states);
    }

    public getState(id: string): State {
        return this.states.find(state => state.STATE === id);
    }

    public getStateName(id: string): string {
        return this.states.find(state => state.STATE === id).STATE_NAME;
    }

    public goToSurgeonResults(id: string) {
        this.router.navigate(['/surgeonresults/' + id + '/procedure/' + this.selectedProcedure.name]);
    }

    public draw(): void {
        var svg = d3.select("svg");

        var path = d3geo.geoPath();
        /* Initialize tooltip */
        var tooltip = d3tip().attr('class', 'd3-tip').html((d) => {
            var currState = this.getState(d.id);
            this.hoveredState = currState;
            return "<div>" + currState.STATE_NAME + "</div>";
        });

        svg.call(tooltip);

        var onClick = (d) => {
            this.goToSurgeonResults(d.id);
        }

        d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
            if (error) throw error;

            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us['objects'].states).features)
                .enter().append("path")
                .attr("d", path)
                .on('mouseover', tooltip.show)
                .on('mouseout', tooltip.hide)
                .on('click', function (d) {
                    console.log('click ' + d.id);
                    tooltip.hide();
                    onClick(d);
                });

            svg.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us['objects'].states, function (a, b) { return a !== b; })));
        });
    }
}