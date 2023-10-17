import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthComponent } from './_pages/auth/auth.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './_pages/common/home/home.component';
import { CommonComponent } from './_pages/common/common.component';
import { authReducer } from 'src/_ngrx/reducers/auth/login.reducer';
import { AuthEffects } from 'src/_ngrx/effects/auth/login.effect';
import { AuthentificationInterceptorInterceptor } from './_interceptor/authentification-interceptor.interceptor';
import { NgZorroAntdModule } from './ng-zorro.module';
import { ChatComponent } from './_pages/common/chat/chat.component';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    CommonComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      authUser : authReducer
    }, {}),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthentificationInterceptorInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
