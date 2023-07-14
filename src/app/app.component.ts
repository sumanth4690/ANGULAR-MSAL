import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Authentication';
  constructor(private _msalService: MsalService,private _event:EventService) {}
  
  ngOnInit(): void {
    this._msalService.instance.handleRedirectPromise().then((res) => {
      if (res != null && res.account != null) {
        this._msalService.instance.setActiveAccount(res.account);
      }
    });
  }
  logIn(){
    this._event.logIn();
  }
  isLoggedIn(){
   return this._event.isLoggedIn();
  }
  logOut(){
    this._event.logOut();
  }
}
