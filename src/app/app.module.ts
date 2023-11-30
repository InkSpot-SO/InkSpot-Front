import { NgModule, isDevMode } from '@angular/core';
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
import { PaginatedPostListComponent } from './_components/page_section/post/paginated-post-list/paginated-post-list.component';
import { PostListItemComponent } from './_components/page_section/post/post-list-item/post-list-item.component';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { defaultDataServiceConfig, entityConfig } from 'src/_ngrx/entity/global.entity';
import { PostEffects } from 'src/_ngrx/effects/post/post.effect';
import { PostSingleComponent } from './_pages/common/post/post-single/post-single.component';
import { CommentListComponent } from './_components/page_section/comment-list/comment-list.component';
import { CommentListItemComponent } from './_components/page_section/comment_list/comment-list-item/comment-list-item.component';
import { PostCreateComponent } from './_pages/common/post/post-create/post-create.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MyPostComponent } from './_pages/common/my-post/my-post.component';
import { ProfilComponent } from './_pages/common/profil/profil.component';
import { LikedPostComponent } from './_pages/common/liked-post/liked-post.component';
import { FavoritePostComponent } from './_pages/common/favorite-post/favorite-post.component';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    CommonComponent,
    HomeComponent,
    ChatComponent,
    PaginatedPostListComponent,
    PostListItemComponent,
    PostSingleComponent,
    CommentListComponent,
    CommentListItemComponent,
    PostCreateComponent,
    MyPostComponent,
    ProfilComponent,
    LikedPostComponent,
    FavoritePostComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,

    AppRoutingModule,
    StoreModule.forRoot({
      authUser : authReducer,
    }, {}),
    EffectsModule.forRoot([
      AuthEffects,
      PostEffects
    ]),
    EntityDataModule.forRoot(entityConfig),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthentificationInterceptorInterceptor,
      multi : true
    },
    {
      provide : DefaultDataServiceConfig,
      useValue : defaultDataServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
