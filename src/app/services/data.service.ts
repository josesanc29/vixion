import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataBackendService } from './data-backend.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private backend: DataBackendService) { }


  // tslint:disable-next-line:typedef
  getListData(): Observable<any>{
    return this.backend.getListDataJson();
  }

  convertToCsv(data: any): void{
    return this.backend.downloadCsvFile(data);
  }

}
