import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _event:EventService, private _dmsanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }
  getData:any
  profilePic?:SafeResourceUrl
  getProfile(){
    this._event.getProfile().subscribe((resp: any) => {
      this.getData = resp;
      debugger
      console.log(resp);
    });
  }
  getProfilePic(){
    this._event.getProfilePic().subscribe(Response=>{
      var UrlCreator=window.URL || window.webkitURL
      this.profilePic=this._dmsanitizer.bypassSecurityTrustResourceUrl(UrlCreator.createObjectURL(Response));
      console.log(this.profilePic)
    })
  }
}
