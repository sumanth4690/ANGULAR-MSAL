import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _event:EventService) { }
  getUsers:any
  ngOnInit(): void {
    this.getProfiles();
  }
  getProfiles(){
    this._event.getProfiles().subscribe((resp:any)=>
    this.getUsers=resp.value)
    // console.log(this.getUsers)
  }
}
