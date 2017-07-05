import { Injectable } from '@angular/core';

import { SurgeonScore } from '../surgeon-score';
import { SURGEON_SCORES } from '../mocks/mock.mpirica';

@Injectable()
export class MpiricaService {
    getScores(): Promise<SurgeonScore[]> { return Promise.resolve(SURGEON_SCORES); }

    getScoresForProcedure(procedure: string): Promise<SurgeonScore[]>
    {
        return this.getScores().then(scores => scores.filter(score => score.procedure === procedure));
        //return this.getScores();
    }
}