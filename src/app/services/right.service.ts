import { Injectable } from '@angular/core';
import {Right, RIGHTS} from '../models/rights.model';

@Injectable({
  providedIn: 'root'
})
export class RightService {
  private rights = RIGHTS;

  constructor() { }

  getSingleById(id: number): Right {
    return this.rights.find(r => r.id === id);
  }

  getAll(): Right[] {
    return this.rights;
  }
}
