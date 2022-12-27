import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DataBackendService {
  Json2csvParser = json2csv.Parser;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {}

  getListDataJson(): Observable<any> {
    const url = './../../assets/mock-data/input_data.json';
    return this.http.get(url).pipe(map((response: any) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      return of(error);
    })
    );
  }
  // tslint:disable-next-line:typedef
  public downloadCsvFile(data: any, filename?: string){
    const csvData: any = this.convertirCSV(data);
    const file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'data.csv');
  }

  public convertirCSV(objArray: any, fields?): void {
    const json2csvParser = new this.Json2csvParser({ opts: fields });
    const csv = json2csvParser.parse(objArray);
    console.log(csv);
    return csv;
  }

}
