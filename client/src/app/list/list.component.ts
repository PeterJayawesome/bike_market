import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BicycleService } from './../bicycle.service';
import { Bike } from './../bike';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	
	bike:Bike=new Bike();
	bikes:[any]


  constructor(private _bikeService:BicycleService,private _router:Router) { }

  ngOnInit() {
    this._bikeService.getUserid((res)=>{
      if(!res){
        this._router.navigate(['/']);
      }
      else{
        this._bikeService.getlist((bikes)=>{
          this.bikes = bikes;
        })
      }
    })
  }

  create(){
  	this._bikeService.create(this.bike,(res)=>{
  		this.bikes = res;
  		this.bike = new Bike();
  	})
  }

  update(bike_id):void{
  	for(var bicycle of this.bikes){
  		if(bicycle._id==bike_id){
  			this._bikeService.update(bicycle,(res)=>{
  				this.bikes = res;
  			})
  		}
    }
  }

  delete(bike_id):void{
  	this._bikeService.delete(bike_id,(res)=>{
  		this.bikes = res;
  	})
  }
}
