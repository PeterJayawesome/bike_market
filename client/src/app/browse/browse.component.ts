import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BicycleService } from './../bicycle.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

	bikes:[any];
  fourbikes:[any];
	searchString:String;
  user:any;
  user_id:String;
  slideIndex: Number = 1;

  constructor(public _bikeService:BicycleService,private _router:Router) { }

  ngOnInit() {
    this._bikeService.getfour((res)=>{
      this.fourbikes = res;
    });
    this._bikeService.getUserid((res)=>{
      if(!res){
        this._router.navigate(['/']);
      }
      else{
        this.user_id = res;
        // this._bikeService.loadChatbar((res)=>{
          
        // })
        this._bikeService.getbikes('',(res)=>{
          this.bikes = res;
        })
      }
    })
    this.showSlides(this.slideIndex);
  	
  }

  search(){
  	this._bikeService.getbikes(this.searchString,(res)=>{
  		this.bikes = res;
  	})
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    if (n > 4) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = 4}
  }

  contact(id){
    this._bikeService.getcontact(id,(res)=>{
      this.user = res;
      confirm("Name: "+this.user.last_name+' '+this.user.first_name+'\nEmail: '+this.user.email);
    })
  }

  delete(id){
    var x = confirm('Are your sure you want to delete this product?');
    if(x){
      this._bikeService.delete(id,(res)=>{
        this._bikeService.getbikes('',(res)=>{
          this.bikes = res;
        })
      })
    }
  }
}
