import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BicycleService {

	username:String;
	userid:string;

  constructor(private _http:Http) { }



  reg(user,callback){
  	this._http.post('/register',user).subscribe(
  		(res)=>{
  			console.log(res.json());
  			if(res.json().user){
  				this.userid = res.json().user._id;
  			}
  			callback(res.json());
  		},
  		(err)=>{
  			console.log(err);
  		}
  	)
  }

  login(user,callback){
  	this._http.post('/login',user).subscribe(
  		(res)=>{
  			console.log(res.json());
  			if(res.json().user){
  				this.userid = res.json().user._id;
  			}
  			callback(res.json());
  		},
  		(err)=>{
  			console.log(err);
  		}
  	)
  }

  getUserid(callback){
    if(this.userid){
      callback(this.userid);
    }
    else{
      this.userid = localStorage.getItem("userid");
      callback(this.userid);
    }
  }

  getlist(callback){
  	this._http.get('/users/'+this.userid+'/bicycles').subscribe(
  		(res)=>{
  			console.log(res);
  			callback(res.json().bikes);
  		},
  		(err)=>{
  			console.log(err);
  		}
  	)
  }

  create(bike,callback){
  	this._http.post('/users/'+this.userid+'/create',bike).subscribe(
  		(res)=>{
  			console.log(res.json());
  			callback(res.json().bikes);
  		},
  		(err)=>{
  			console.log(err);
  		}
  	)
  }

  update(bike,callback){
	  console.log(bike);
  	this._http.put('/users/'+this.userid+'/bicycles/'+bike._id,bike).subscribe(
  		(res)=>{
  			console.log("Get result: ",res.json());
  			callback(res.json().bikes);
  		},
  		(err)=>{
  			console.log(err);
  		}
  	)
  }

  delete(bike_id,callback){
    console.log('/users/'+this.userid+'/bicycles/'+bike_id);
  	this._http.delete('/users/'+this.userid+'/bicycles/'+bike_id).subscribe(
  		(res)=>{
  			console.log('delete success: ', res.json());
  			callback(res.json().bikes);
  		}
  	)
  }

  getbikes(str,callback){
  	if(str == ''){
  		this._http.get('/bicycles/all').subscribe(
	  		(res)=>{
	  			console.log("get bikes: ",res.json().bikes);
	  			callback(res.json().bikes);
	  		},
	  		(err)=>{
	  			console.log(err);
	  		}
	  	)
  	}
  	else{
	  	this._http.get('/bicycles/search/'+str).subscribe(
	  		(res)=>{
	  			console.log("get bikes: ",res.json().bikes);
	  			callback(res.json().bikes);
	  		},
	  		(err)=>{
	  			console.log(err);
	  		}
	  	)
  	}
  }

  getfour(callback){
    this._http.get('/bicycles/pickone').subscribe(
      (res)=>{
        console.log('get four bikes: ', res.json());
        callback(res.json());
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getcontact(id,callback){
    this._http.get('/bicycles/user/'+id).subscribe(
      (res)=>{
        console.log(res);
        callback(res.json());
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  

}
