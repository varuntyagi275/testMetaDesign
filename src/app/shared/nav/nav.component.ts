import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Location } from "@angular/common";
import { ApiServiceService } from 'src/app/services/api-service.service';
import { debounceTime } from 'rxjs/internal/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,OnChanges {
  router: any;
  flag: boolean=false;
  search:string=''
  
 
  constructor(private _router: Router, private apiService:ApiServiceService){
     
    
}
  ngOnChanges(changes: SimpleChanges): void {
    this.flag = this.check()
  }
  ngOnInit(): void {
  
  }


  searchMethod(eve:Event){
    
   this.apiService.searchObservable.next(this.search)
   
  }

  check():boolean{
    
    if(this._router.url.includes('/home')){
      return true
    }else { 
      return false
    }
    
  }

}
