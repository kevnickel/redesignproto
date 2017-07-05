import { Injectable } from '@angular/core';

import { ProcedureCategory } from '../procedure-category';
import { PROCEDURE_CATEGORIES } from '../mocks/mock.procedurecategories';

@Injectable()
export class ProcedureCategoryService {
    getProcedureCategories(): Promise<ProcedureCategory[]> { return Promise.resolve(PROCEDURE_CATEGORIES); }
}