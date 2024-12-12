// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for API calls

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service'; // Import AuthService
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule for routing

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule // Add AppRoutingModule here
  ],
  providers: [AuthService], // Provide AuthService
  bootstrap: [AppComponent]
})
export class AppModule { }
