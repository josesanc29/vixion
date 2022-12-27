import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../app/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styles: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  machinedata: any = null;
  loading = false;
  typeSelected: string;

  constructor(
    private spinner: NgxSpinnerService,
    private service: DataService) {
      this.typeSelected = 'ball-fussion';
     }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.spinner.show();
    this.service.getListData().subscribe((listDatas: any[]) => {
      if (listDatas){
        this.spinner.hide();
        this.loading = true;
        this.machinedata = listDatas;
        console.log('machinedata ', this.machinedata);
      }
    });
  }

  downloadFile(): void{
    return this.service.convertToCsv(this.machinedata);
  }

}
