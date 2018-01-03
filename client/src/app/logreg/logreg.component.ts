import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../bicycle.service';
import { Router } from '@angular/router';
declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {

	user = {email:'',password:''};
	
	reg = {first_name:'',last_name:'',email:'',password:'',c_password:''};

	errmessage = {reg:'',log:''};

  rl = 'l';

  bikes:[any];

  bikeimg:string;

  i:number = 0;


  constructor(private _bicycleService: BicycleService, private _router:Router) { }

  ngOnInit() {
    window.localStorage.removeItem("userid");
    this._bicycleService.getfour((res)=>{
      this.bikes = res;
      console.log(this.i);
      setInterval(()=>{
        if(this.i == 3){
          this.i = 0;
        }
        else{ this.i += 1 }
        // console.log(this.i);
      },5000)
    });
    $(function() {

      $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      
      $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
    });
  }

  login(){
  	this._bicycleService.login(this.user,(res)=>{
  		if(res.message =="success"){
        window.localStorage.setItem("userid",this._bicycleService.userid);
	  		this._router.navigate(['browse']);
  		}
  		else{
  			this.errmessage.log = "Invalid Credentials";
  		}
  	});
  }

  regist(){
  	this._bicycleService.reg(this.reg,(res)=>{
  		if(res.message =="success"){
        window.localStorage.setItem("userid",this._bicycleService.userid);
	  		this._router.navigate(['browse']);
  		}
  		else{
  			this.errmessage.reg = "Email has been token."
  		}
  	})
  }

  change(str){
    if(str=='left'){
      if(this.i==0){
        this.i = 3;
      }
      else{
        this.i -= 1;
      }
    }
    else{
      if(this.i == 3){
        this.i = 0;
      }
      else{
        this.i += 1;
      }
    }
  }

}
