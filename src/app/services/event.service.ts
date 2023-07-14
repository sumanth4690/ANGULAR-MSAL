import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const GRAPH_USER='https://graph.microsoft.com/v1.0/me/';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private _msalService: MsalService, private _http: HttpClient) {}
  isLoggedIn(): boolean {
    return this._msalService.instance.getActiveAccount() != null;
  }
  logIn() {
    this._msalService.loginRedirect();
  }
  logOut() {
    this._msalService.logoutRedirect();
  }
  getProfilePic() {
    return this._http.get(GRAPH_ENDPOINT_PIC, { responseType: 'blob' });
  }
  getProfile() {
    return this._http.get(GRAPH_USER);
  }
  getProfiles() {
    return this._http.get('https://graph.microsoft.com/v1.0/users');
  }
}
