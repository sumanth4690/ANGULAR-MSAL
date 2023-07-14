import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import {
  MsalModule,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { EventService } from './services/event.service';
import { environment } from 'src/environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.redirectUri,
      authority: environment.authority,
    },
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    'https://graph.microsoft.com/v1.0/me',
    environment.scopes
  );
  protectedResourceMap.set(
    'https://graph.microsoft.com/v1.0/me/photo/$value',
    environment.scopes
  );
  protectedResourceMap.set(
    'https://graph.microsoft.com/v1.0/users',
    environment.scopes
  );
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
@NgModule({
  declarations: [AppComponent, ProfileComponent, UsersComponent],
  imports: [BrowserModule, AppRoutingModule, MsalModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    EventService,
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
