import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../bicycle.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

	bikes:[any];
	searchString:String;
  user:any;
  user_id:String

  constructor(public _bikeService:BicycleService) { }

  ngOnInit() {
  	this._bikeService.getbikes('',(res)=>{
      this.user_id = this._bikeService.userid;
      this.bikes = res;
  	})
  }

  search(){
  	this._bikeService.getbikes(this.searchString,(res)=>{
  		this.bikes = res;
  	})
  }

  contact(id){
    this._bikeService.getcontact(id,(res)=>{
      this.user = res;
      alert("Name: "+this.user.last_name+' '+this.user.first_name+'\nEmail: '+this.user.email);
    })
  }

  delete(id){
    this._bikeService.delete(id,(res)=>{
      this._bikeService.getbikes('',(res)=>{
        this.bikes = res;
      })
    })
  }

}
