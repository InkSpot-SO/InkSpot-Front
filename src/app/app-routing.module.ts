import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './_pages/auth/auth.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { CommonComponent } from './_pages/common/common.component';
import { HomeComponent } from './_pages/common/home/home.component';
import { unauthGuard } from './_guards/auth/unauth.guard';
import { authGuard } from './_guards/auth/auth.guard';
import { ChatComponent } from './_pages/common/chat/chat.component';
import { PostSingleComponent } from './_pages/common/post/post-single/post-single.component';
import { PostCreateComponent } from './_pages/common/post/post-create/post-create.component';
const routes: Routes = [
  {
    path: 'auth',
    component : AuthComponent,
    canActivate : [authGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component : LoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path : '',
    component : CommonComponent,
    canActivate : [unauthGuard],
    children : [
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'chat',
        component : ChatComponent
      },
      {
        path : 'post',
        children : [
          {
            path : 'create',
            component : PostCreateComponent
          },
          {
            path : ':id',
            component : PostSingleComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
